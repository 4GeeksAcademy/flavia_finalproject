"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, redirect, url_for, send_from_directory
from paypalrestsdk import Payment
import requests

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from datetime import datetime

import re

from sqlalchemy.exc import IntegrityError

from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, Freelance, Appointment, Order, FavFoods, FavWorkouts, FavArticles
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from flask_bcrypt import Bcrypt

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


#from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

bcrypt = Bcrypt(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)


# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app, supports_credentials=True)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

@app.route('/users', methods=['GET'])
def handle_all_users():
    users = User.query.all()
    serialized_users = [user.serialize() for user in users]
    return jsonify(serialized_users)
# LOGIN ENDPOINTS
@app.route('/signup', methods=['POST'])
def handle_new_user():
    body = request.get_json(silent=True)

    if body is None:
        return jsonify({'msg':'Body must be filled'}), 400

    # Registro regular
    if 'password' in body:
        # Validaciones para registro regular
        required_fields = ['full_name', 'email', 'password']
        for field in required_fields:
            if field not in body or not body[field]:
                return jsonify({'msg': f'Missing field {field}'}), 400

        if User.query.filter_by(email=body['email']).first():
            return jsonify({'msg': 'There is already an account associated with that email'}), 400

        pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')

        new_user = User()
        new_user.full_name = body['full_name']
        new_user.email = body['email']
        new_user.password = pw_hash
        new_user.is_active = True

    # Registro con Google
    elif 'id_token' in body:
        # Verificar el token de Google
        response = requests.get(f'https://oauth2.googleapis.com/tokeninfo?id_token={body["id_token"]}')
        if not response.ok:
            return jsonify({'msg': 'Invalid Google token'}), 400

        google_info = response.json()

        # Comprobar si el usuario ya existe
        if User.query.filter_by(email=google_info['email']).first():
            return jsonify({'msg': 'There is already an account associated with that email'}), 400

        # Crear un nuevo usuario con la información de Google
        new_user = User()
        new_user.full_name = google_info.get('name')  # Puedes ajustar esto según tu modelo
        new_user.email = google_info['email']
        new_user.google_id = google_info['sub']  # 'sub' es el identificador único del usuario en Google
        new_user.is_active = True

    else:
        return jsonify({'msg': 'Invalid registration data'}), 400

    # Intenta agregar el usuario a la base de datos
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'msg': 'User successfully registered '}), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({'msg': 'Error registering user'}), 500

@app.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg':'Body must be filled'}), 400

    # Inicio de sesión regular
    if 'email' in body and 'password' in body:
        user = User.query.filter_by(email=body['email']).first()
        if not user or not bcrypt.check_password_hash(user.password, body['password']):
            return jsonify({"msg": "Bad username or password"}), 400
        access_token = create_access_token(identity=user.email)

    # Inicio de sesión con Google
    elif 'id_token' in body:
        response = requests.get(f'https://oauth2.googleapis.com/tokeninfo?id_token={body["id_token"]}')
        if not response.ok:
            return jsonify({'msg': 'Invalid Google token'}), 400
        google_info = response.json()

        user = User.query.filter_by(email=google_info['email']).first()
        if not user:
            return jsonify({"msg": "Google user not found"}), 400
        access_token = create_access_token(identity=user.email)
    else:
        return jsonify({'msg': 'Invalid login data'}), 400

    return jsonify(access_token=access_token), 200


@app.route('/my-account', methods=['GET'])
@jwt_required()
def my_account():
    email = get_jwt_identity()
    return jsonify(user=email), 200

#  ------------------------------------------------------------------------------------------------------------------------------------------
# Obtener todos los freelances disponibles y Agregar un nuevo freelance (la hice por las dudas que la necesitara pero no la utilizo)
@app.route('/freelance', methods=['GET', 'POST'])
def handle_freelance():
    if request.method == 'GET':
        freelance = Freelance.query.filter_by(is_active=True).all()
        freelance_serialized = list(map(lambda x: x.serialize(), freelance))
        return jsonify(freelance_serialized)
    if request.method == 'POST':
        body = request.get_json(silent=True)
        if body is None:
            return jsonify({'msg':'Body must be filled'}), 400
        if 'email' not in body  or body['email'] is None or body['email'] == '':
            return jsonify({'msg': 'Specify email'}), 400
        if 'password' not in body or body['password'] is None or body['password'] == '':
            return jsonify({'msg': 'Specify password'}), 400
        pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
        new_freelance = Freelance() 
        new_freelance.email = body['email'],
        new_freelance.password = pw_hash,
        new_freelance.is_active = True
        db.session.add(new_freelance)
        db.session.commit()
        return jsonify({'message': 'Freelance successfully added'}), 200
    
# Editar la información de un freelance (la hice por las dudas que la necesitara pero no la utilizo)
@app.route('/freelance/<int:freelance_id>', methods=['PUT'])
def edit_freelance(freelance_id):
    freelance = Freelance.query.get(freelance_id)
    if freelance is None:
        return jsonify({'error': 'Freelance not found'}), 400
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Body cannot be empty'}), 400
    if 'email' in body:
        freelance.email = body['email']
    if 'password' in body:
        freelance.age = body['password']
    db.session.commit()
    return jsonify({'msg': 'Updated freelance with ID {}'.format(freelance_id)}), 200

# APPOINTMENTS ENDPOINTS -------------------------------------------------------------------------------------------------------------------
# Función que utiliza la key de sendgrid para enviar el correo de confirmación
def send_confirmation_email(email):
    try:
        message = Mail(
            from_email='bettertogether.project.4geeks@gmail.com',
            to_emails=email,
            subject='Your Journey Towards Transformative Wellbeing Starts Now!',
            html_content='<strong>Remember, every step you take is a victory, and we are here to celebrate and support you at every moment. Got questions or need to adjust anything? We are just a message away.</strong>'
        )
        sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(f"Error al enviar el correo: {e}")

# Obtiene las citas de un freelance en concreto
@app.route('/appointment/<int:freelance_id>', methods=['GET'])
def handle_freelancesappointmentes(freelance_id):
    appointments = Appointment.query.filter_by(freelance_id=freelance_id).all()
    appointments_data = []

    for appointment in appointments:
        appointment_data = appointment.serialize()
        appointments_data.append(appointment_data)

    return jsonify(appointments_data), 200

# Obtener todas las citas de un usuario o freelance desde el token
@app.route('/my-appointments', methods=['GET'])
@jwt_required()
def handle_individual_appointments():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if user is not None:
        user_appointments = Appointment.query.filter_by(user_id=user.id).all()
        user_type = "User"
    else:
        freelancer = Freelance.query.filter_by(email=email).first()
        if freelancer is not None:
            user_appointments = Appointment.query.filter_by(freelance_id=freelancer.id).all()
            user_type = "Freelance"
        else:
            return jsonify({"message": "Usuario no encontrado"}), 404
    
    serialized_user_appointments = [appointment.serialize() for appointment in user_appointments]
    return jsonify({"user_type": user_type, "appointments": serialized_user_appointments})

# Agrega un appointment
@app.route('/appointment', methods=['POST'])
@jwt_required()
def handle_appointments():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg':'Body must be filled'}), 400
    if 'freelance_id' not in body or 'day' not in body or 'time' not in body:
        return jsonify({'msg': 'Specify freelance_id, day and time'}), 400

    # Combinar la fecha y la hora
    formatted_datetime = f"{body['day']} {body['time']}"

    # Verificar si ya existe una cita con el mismo freelance_id, día y hora
    existing_appointment = Appointment.query.filter_by(
        freelance_id=body['freelance_id'],
        day=body['day'],
        time=body['time']
    ).first()

    if existing_appointment:
        return jsonify({'msg': 'Appointment already exists for this day and time'}), 400

    day = body['day']
    time = body['time']
    freelance_id = str(body['freelance_id'])

    # Reemplazar los caracteres que no sean alfanuméricos o guiones bajos con nada
    jitsi_room_id = re.sub(r'[^\w]', '', day + time + freelance_id)

    formatted_day = day.replace('-', '')
    formatted_time = time.replace(':', '')
    jitsi_room_id = f"{formatted_day}{formatted_time}{freelance_id}"

    new_appointment = Appointment(
        user_id=user.id,
        freelance_id=body['freelance_id'],
        day=body['day'],
        time=body['time'],
        full_date=formatted_datetime,
        jitsi_room_id=jitsi_room_id 
        )
    db.session.add(new_appointment)
    db.session.commit()
    email = user.email
    send_confirmation_email(email)
    return jsonify({'message': 'Appointment successfully added'}), 200

# Actualiza los datos de un appointment (la hice pero aún no la he utilizado)
@app.route('/appointments/<int:appointment_id>', methods=['PUT'])
def edit_appointment(appointment_id):
    appointment = Appointment.query.get(appointment_id)
    if appointment is None:
        return jsonify({'error': 'Appointment not found'}), 400
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Body cannot be empty'}), 400
    if 'user_id' in body:
        appointment.user_id = body['user_id']
    if 'freelance_id' in body:
        appointment.freelance_id = body['freelance_id']
    if 'day' in body:
        appointment.day = body['day']
    if 'time' in body:
        appointment.time = body['time']
    if 'paid' in body:
        appointment.paid = body['paid']
    db.session.commit()
    return jsonify({'msg': 'Updated Appointment with ID {}'.format(appointment_id)}), 200

# Configuramos las credenciales de PayPal
PAYPAL_CLIENT_ID = os.getenv('PAYPAL_CLIENT_ID')
PAYPAL_CLIENT_SECRET = os.getenv('PAYPAL_CLIENT_SECRET')

# Generamos un token de acceso para autenticarnos con PayPal
def generate_access_token():
    try:
        auth = f"{PAYPAL_CLIENT_ID}:{PAYPAL_CLIENT_SECRET}"
        headers = {'Authorization': f'Basic {auth}'}
        payload = {'grant_type': 'client_credentials'}
        response = requests.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', headers=headers, data=payload)
        data = response.json()
        return data['access_token']
    except Exception as e:
        print(f"Failed to generate Access Token: {e}")
        return None

# Creamos una orden para iniciar la transacción
def create_order():
    access_token = generate_access_token()
    if access_token:
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {access_token}'
        }
        payload = {
            'intent': 'CAPTURE',
            'purchase_units': [
                {
                    'amount': {
                        'currency_code': 'EUR',
                        'value': '5.00'
                    }
                }
            ]
        }
        response = requests.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', headers=headers, json=payload)
        return handle_response(response)
    return None

# Capturamos el pago para completar la transacción
def capture_order(order_id):
    access_token = generate_access_token()
    if access_token:
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {access_token}'
        }
        response = requests.post(f'https://api-m.sandbox.paypal.com/v2/checkout/orders/{order_id}/capture', headers=headers)
        return handle_response(response)
    return None

# Manejamos la respuesta de PayPal
def handle_response(response):
    try:
        jsonResponse = response.json()
        return jsonResponse, response.status_code
    except Exception as e:
        errorMessage = response.text
        raise Exception(errorMessage)

# Definimos las rutas y controladores
@app.route('/api/orders', methods=['POST'])
def create_order_route():
    try:
        cart = request.json['cart']
        jsonResponse, httpStatusCode = create_order()
        order = Order(order_id=jsonResponse['id'])
        db.session.add(order)
        db.session.commit()
        return jsonify(jsonResponse), httpStatusCode
    except Exception as e:
        print(f"Failed to create order: {e}")
        return jsonify({'error': 'Failed to create order.'}), 500

@app.route('/api/orders/<order_id>/capture', methods=['POST'])
def capture_order_route(order_id):
    try:
        jsonResponse, httpStatusCode = capture_order(order_id)
        return jsonify(jsonResponse), httpStatusCode
    except Exception as e:
        print(f"Failed to capture order: {e}")
        return jsonify({'error': 'Failed to capture order.'}), 500


# Usando la API Edaman ---------------------------------------------------------------------------------------------------------
app_id = os.getenv('FOODDATABASE_ID')
app_key = os.getenv('FOODDATABASE_KEY') 

@app.route('/search_food/<string:query>', methods=['GET'])
def search_food(query):
    # URL para la búsqueda de alimentos en la API de Edamam
    url = f"https://api.edamam.com/api/food-database/v2/parser?app_id={app_id}&app_key={app_key}&ingr={query}&nutrition-type=cooking"
    print(url)
    # Realizar la solicitud a la API de Edamam
    try:
        response = requests.get(url)
        return jsonify(response.json())
    except requests.RequestException as e:
        print(f"Error al realizar la solicitud a la API de Edamam: {e}")
        return jsonify({'error': 'Error al realizar la solicitud a la API'}), 500


@app.route('/get-nutrients', methods=['POST'])
def get_nutrients():
    body = request.get_json(silent=True)
    food_id = body['foodId']
    measure_uri = body['measureURI']
 
    url = f'https://api.edamam.com/api/food-database/v2/nutrients?app_id={app_id}&app_key={app_key}'
    headers = {'Content-Type': 'application/json'}
    payload = {
    'ingredients': [
            {
                'quantity': 100,
                'measureURI': measure_uri,
                'foodId': food_id
            }
        ]
    }

    response = requests.post(url, headers=headers, json=payload)
    if response.ok:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Request failed'}), response.status_code


# Usando la api de NewsAPI ----------------------------------------------------------------------

NEWSAPI_KEY = os.getenv('NEWSAPI_KEY')

@app.route('/api/everything', methods=['GET'])
def get_everything():
    query = request.args.get('q')
    from_date = request.args.get('from')
    to_date = request.args.get('to')
    sort_by = request.args.get('sortBy', 'publishedAt')  # Default: 'publishedAt'
    
    url = 'https://newsapi.org/v2/everything'
    params = {
        'q': query,
        'from': from_date,
        'to': to_date,
        'sortBy': sort_by,
        'apiKey': NEWSAPI_KEY
    }
    response = requests.get(url, params=params)
    return jsonify(response.json())

# Usando la API de RapidAPI -----------------------------------------------------------------------------
RAPIDAPI_KEY = os.getenv('RAPIDAPI_KEY')
@app.route('/search_youtube', methods=['GET'])
def search_youtube():
    query = request.args.get('query')
    url = "https://youtube-search-results.p.rapidapi.com/youtube-search/"
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY, 
        "X-RapidAPI-Host": "youtube-search-results.p.rapidapi.com"
    }
    querystring = {"q": query}
    response = requests.get(url, headers=headers, params=querystring)
    return jsonify(response.json())

# FAV FOODS  -------------------------------------------------------------------------------------------------
@app.route('/addFavFood', methods=['POST'])
@jwt_required()
def handle_add_fav_food():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'message': 'Body must be filled'}), 400
    if 'foodId' not in body or not body['foodId']:
                return jsonify({'message':'Missing foodId'}), 400
    if 'measureURI' not in body or not body['measureURI']:
                return jsonify({'message':'Missing measureURI'}), 400
    if 'foodName' not in body or not body['foodName']:
                return jsonify({'message':'Missing foodName'}), 400
    if 'calories' not in body or not body['calories']:
                return jsonify({'message':'Missing calories'}), 400
    if FavFoods.query.filter_by(user_id=user.id, foodId=body['foodId']).first():
            return jsonify({'msg': 'Food already in favorites'}), 400
    
    new_fav_food = FavFoods()
    new_fav_food.user_id = user.id
    new_fav_food.foodId = body['foodId']
    new_fav_food.measureURI = body['measureURI']
    new_fav_food.foodName = body['foodName']
    new_fav_food.calories = body['calories']
    db.session.add(new_fav_food)
    db.session.commit()
    return jsonify({'message': 'Fav food succesfully added'})

@app.route('/my-fav-foods', methods=['GET'])
@jwt_required()
def handle_user_fav_foods():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    user_fav_foods = FavFoods.query.filter_by(user_id=user.id).all()
    serialized_user_fav_foods = [favFood.serialize() for favFood in user_fav_foods]
    return jsonify(serialized_user_fav_foods)

@app.route('/deleteFavFood/<string:foodId>', methods=['DELETE'])
@jwt_required()
def handle_delete_fav_food(foodId):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()

    fav_food = FavFoods.query.filter_by(user_id=user.id, foodId=foodId).first()
    if not fav_food:
        return jsonify({'message': 'Food not found'}), 404

    db.session.delete(fav_food)
    db.session.commit()
    return jsonify({'message': 'Fav food successfully deleted'}), 200

#FAV WORKOUTS----------------------------------------------------------------------------------------------------
@app.route('/addFavWorkout', methods=['POST'])
@jwt_required()
def handle_add_fav_workout():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'message': 'Body must be filled'}), 400
    if 'videoId' not in body or not body['videoId']:
                return jsonify({'message':'Missing videoId'}), 400
    if FavWorkouts.query.filter_by(user_id=user.id, videoId=body['videoId']).first():
            return jsonify({'msg': 'video already in favorites'}), 400
    
    new_fav_video = FavWorkouts()
    new_fav_video.user_id = user.id
    new_fav_video.videoId = body['videoId']
    db.session.add(new_fav_video)
    db.session.commit()
    return jsonify({'message': 'Fav workout succesfully added'})

@app.route('/my-fav-workouts', methods=['GET'])
@jwt_required()
def handle_user_fav_workouts():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    user_fav_workouts = FavWorkouts.query.filter_by(user_id=user.id).all()
    serialized_user_fav_workouts = [favWorkout.serialize() for favWorkout in user_fav_workouts]
    return jsonify(serialized_user_fav_workouts)

@app.route('/deleteFavWorkout/<string:videoId>', methods=['DELETE'])
@jwt_required()
def handle_delete_fav_workout(videoId):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()

    fav_workout = FavWorkouts.query.filter_by(user_id=user.id, videoId=videoId).first()
    if not fav_workout:
        return jsonify({'message': 'Workout not found'}), 404
    
    db.session.delete(fav_workout)
    db.session.commit()
    return jsonify({'message': 'Fav workout successfully deleted'}), 200

#FAV ARTICLES------------------------------------------------------------------------------------------------------------------------------
@app.route('/addFavArticle', methods=['POST'])
@jwt_required()
def handle_add_fav_article():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'message': 'Body must be filled'}), 400
    if 'title' not in body or not body['title']:
                return jsonify({'message':'Missing title'}), 400
    if 'author' not in body or not body['author']:
                return jsonify({'message':'Missing author'}), 400
    if 'url' not in body or not body['url']:
                return jsonify({'message':'Missing url'}), 400
    if FavArticles.query.filter_by(user_id=user.id, title=body['title'], author=body['author'], url=body['url']).first():
            return jsonify({'msg': 'video already in favorites'}), 400
    
    new_fav_article = FavArticles()
    new_fav_article.user_id = user.id
    new_fav_article.title = body['title']
    new_fav_article.author = body['author']
    new_fav_article.url = body['url']
    new_fav_article.imageUrl = body['imageUrl']
    db.session.add(new_fav_article)
    db.session.commit()
    return jsonify({'message': 'Fav article succesfully added'})

@app.route('/my-fav-articles', methods=['GET'])
@jwt_required()
def handle_user_fav_articles():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    user_fav_articles = FavArticles.query.filter_by(user_id=user.id).all()
    serialized_user_fav_articles = [favArticle.serialize() for favArticle in user_fav_articles]
    return jsonify(serialized_user_fav_articles)

@app.route('/deleteFavArticle', methods=['DELETE'])
@jwt_required()
def handle_delete_fav_article():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'message': 'Body must be filled'}), 400
    if 'title' not in body or not body['title']:
                return jsonify({'message':'Missing title'}), 400
    if 'author' not in body or not body['author']:
                return jsonify({'message':'Missing author'}), 400
    if 'url' not in body or not body['url']:
                return jsonify({'message':'Missing url'}), 400
    fav_article = FavArticles.query.filter_by(user_id=user.id, title=body['title'], author=body['author'], url=body['url']).first()
    if not fav_article:
        return jsonify({'message': 'Article not found'}), 404
    
    db.session.delete(fav_article)
    db.session.commit()
    return jsonify({'message': 'Fav article successfully deleted'}), 200

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
