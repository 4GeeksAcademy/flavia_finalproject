"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, Freelance, Appointment
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

# Endpoints para Appointment
@app.route('/appointments', methods=['GET', 'POST'])
def handle_appointments():
    if request.method == 'GET':
        appointments = Appointment.query.all()
        serialized_appointments = list(map(lambda x: x.serialize(), appointments))
        return jsonify(serialized_appointments)
    if request.method == 'POST':
        body = request.get_json(silent=True)
        if body is None:
            return jsonify({'msg':'Body must be filled'}), 400
        if 'user_id' not in body or 'freelance_id' not in body or 'day' not in body or 'time' not in body:
            return jsonify({'msg': 'Specify user_id, freelance_id, day and time'}), 400
        
        new_appointment = Appointment(
            user_id=body['user_id'],
            freelance_id=body['freelance_id'],
            day=body['day'],
            time=body['time']
        )
        db.session.add(new_appointment)
        db.session.commit()
        return jsonify({'message': 'Appointment successfully added'}), 200

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


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
