from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Freelance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(80), unique=True, nullable=False)
    age = db.Column(db.Integer, unique=False, nullable=False)
    URLphoto = db.Column(db.String(200), unique=False, nullable=True, default='https://www.eloccidental.com.mx/incoming/gvhext-richard-burlton-htpmedsyzag-unsplash.jpg/ALTERNATES/LANDSCAPE_768/richard-burlton-HTpmedSyZag-unsplash.jpg')
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    professional_registration_number = db.Column(db.Integer, unique=True)
    years_of_experience = db.Column(db.Integer, unique=False)
    education = db.Column(db.String(120), unique=False)
    expertise = db.Column(db.String(200), unique=False)
    aboutme = db.Column(db.String(300), unique=False, nullable=True)
    availability = db.Column(db.JSON, nullable=True)

    def __repr__(self):
        return 'Freelance {}'.format(self.full_name)

    def serialize(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "age": self.age,
            "email": self.email,
            "professional_registration_number": self.professional_registration_number,
            "years_of_experience": self.years_of_experience,
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
    
    def __repr__(self):
        return 'Appointment {}'.format(self.id)
    
    def serialize(self):
        return {
            "id": self.id,
            "user_data": self.user_data.serialize(),
            "freelance_data": self.freelance_data.serialize(),
            "day": self.day,
            "time": self.time.strftime('%H:%M'),
            "full_date": self.full_date.strftime('%Y-%m-%d %H:%M:%S') if self.full_date else None
        }


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(50), nullable=False)


