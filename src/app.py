"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, Freelance, Availability, Appointment
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
CORS(app)

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

# LOGIN ENDPOINTS
@app.route('/signup', methods=['POST'])
def handle_new_user():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg':'Body must be filled'}), 400
    if 'email' not in body or body['email'] is None or body['email'] == '':
        return jsonify({'msg': 'Specify email'}), 400
    if User.query.filter_by(email= body['email']).first():
        return jsonify({'msg': 'There is already an account associated with that email'}), 400
    if 'password' not in body or body['password'] is None or body['password'] == '':
        return jsonify({'msg': 'Specify password'}), 400
    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    new_user = User()
    new_user.email = body['email']
    new_user.password = pw_hash
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'User successfully registered '}), 200

@app.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg':'Body must be filled'}), 400
    if 'email' not in body  or body['email'] is None or body['email'] == '':
        return jsonify({'msg': 'Specify email'}), 400
    if 'password' not in body or body['password'] is None or body['password'] == '': 
        return jsonify({'msg': 'Specify password'}), 400
    user = User.query.filter_by(email = body['email']).first()
    if not user:
        return jsonify({"msg": "Bad username or password"}), 400
    if not bcrypt.check_password_hash(user.password, body['password']):
        return jsonify({"msg": "Bad username or password"}), 400
    
    access_token = create_access_token(identity=user.email)
    return jsonify(access_token=access_token)

@app.route('/my-account', methods=['GET'])
@jwt_required()
def my_account():
    email = get_jwt_identity()
    return jsonify(user=email), 200

# APPOINTMENTS ENDPOINTS
# Obtener todas las disponibilidades y Agregar una nueva disponibilidad
@app.route('/availabilities', methods=['GET', 'POST'])
def handle_availabilities():
    if request.method == 'GET':
        availabilities = Availability.query.all()
        availabilities_serialized = list(map(lambda x: x.serialize(), availabilities))
        return jsonify(availabilities_serialized)
    if request.method == 'POST':
        body = request.get_json(silent=True)
        if body is None:
            return jsonify({'msg':'Body must be filled'}), 400
        if 'day' not in body  or body['day'] is None or body['day'] == '':
            return jsonify({'msg': 'Specify day'}), 400
        if 'start_time' not in body or body['start_time'] is None or body['start_time'] == '': 
            return jsonify({'msg': 'Specify start_time'}), 400
        if 'end_time' not in body or body['end_time'] is None or body['end_time'] == '': 
            return jsonify({'msg': 'Specify end_time'}), 400
        new_availability = Availability() 
        new_availability.day = body['day'],
        new_availability.start_time = body['start_time'],
        new_availability.end_time = body['end_time']
        db.session.add(new_availability)
        db.session.commit()
        return jsonify({'message': 'Availability successfully added'}), 200
    
# Editar una disponibilidad
@app.route('/availabilities/<int:availability_id>', methods=['PUT'])
def edit_availability(availability_id):
    availability = Availability.query.get(availability_id)
    if availability is None:
        return jsonify({'error': 'Availability not found'}), 400
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Body cannot be empty'}), 400
    if 'day' in body:
        availability.day = body['day']
    if 'start_time' in body:
        availability.start_time = body['start_time']
    if 'end_time' in body:
        availability.end_time = body['end_time']
    db.session.commit()
    return jsonify({'msg': 'Updated availability with ID {}'.format(availability_id)}), 200

# Obtener todos los freelances disponibles y Agregar un nuevo freelance
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
    
# Editar la información de un freelance
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

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
