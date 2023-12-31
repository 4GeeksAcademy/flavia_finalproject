from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(60), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    google_id = db.Column(db.String(250), unique=True, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Freelance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(80), unique=True, nullable=False)
    URLphoto = db.Column(db.String(200), unique=False, nullable=True, default='https://images.griddo.universitatcarlemany.com/c/contain/q/65/w/754/h/503/f/jpeg/la-importancia-de-la-nutricion-en-la-salud-1')
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    professional_registration_number = db.Column(db.String(20), unique=True)
    education = db.Column(db.String(250), unique=False)
    expertise = db.Column(db.String(200), unique=False)
    aboutme = db.Column(db.String(300), unique=False, nullable=True)
    availability = db.Column(db.JSON, nullable=True)

    def __repr__(self):
        return 'Freelance {}'.format(self.full_name)

    def serialize(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "professional_registration_number": self.professional_registration_number,
            "education": self.education,
            "expertise": self.expertise, 
            "URLphoto": self.URLphoto,
            "aboutme": self.aboutme,
            "availability": self.availability
            # do not serialize the password, its a security breach
        }
    
class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_data = db.relationship(User)
    freelance_id = db.Column(db.Integer, db.ForeignKey('freelance.id'))
    freelance_data = db.relationship(Freelance)
    day = db.Column(db.String(10), nullable=False) 
    time = db.Column(db.Time, nullable=False)
    full_date = db.Column(db.DateTime, nullable=True)
    jitsi_room_id = db.Column(db.String(50), unique=True, nullable=True)
    
    def __repr__(self):
        return 'Appointment {}'.format(self.id)
    
    def serialize(self):
        return {
            "id": self.id,
            "user_data": self.user_data.serialize(),
            "freelance_data": self.freelance_data.serialize(),
            "day": self.day,
            "time": self.time.strftime('%H:%M'),
            "full_date": self.full_date.strftime('%Y-%m-%d %H:%M:%S') if self.full_date else None,
            "jitsi_room_id": self.jitsi_room_id
        }


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(50), nullable=False)

class FavFoods(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_data = db.relationship(User)
    foodId = db.Column(db.String(120), unique=False, nullable=False)
    measureURI = db.Column(db.String(200), unique=False, nullable=False)
    foodName = db.Column(db.String(80), unique=False, nullable=True)
    calories = db.Column(db.String(80), unique=False, nullable=True)

    def __repr__(self):
        return 'Fav name{}'.format(self.foodName)
    
    def serialize(self):
        return {
            "id": self.id,
            "user_data": self.user_data.serialize(),
            "foodId": self.foodId,
            "measureURI": self.measureURI,
            "foodName": self.foodName,
            "calories": self.calories
        }

class FavWorkouts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_data = db.relationship(User)
    videoId = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return 'Fav workout id{}'.format(self.videoId)
    
    def serialize(self):
        return {
            "id": self.id,
            "user_data": self.user_data.serialize(),
            "videoId": self.videoId,
        }

class FavArticles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_data = db.relationship(User)
    title = db.Column(db.String(100), unique=False, nullable=False)
    author = db.Column(db.String(80), unique=False, nullable=False)
    url = db.Column(db.String(200), unique=False, nullable=False)
    imageUrl = db.Column(db.String(200), unique=False, nullable=True)

    def __repr__(self):
        return 'Fav article {}'.format(self.title)
    
    def serialize(self):
        return {
            "id": self.id,
            "user_data": self.user_data.serialize(),
            "title": self.title,
            "author": self.author,
            "url": self.url,
            "imageUrl": self.imageUrl
        }

