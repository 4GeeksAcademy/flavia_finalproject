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

    def __repr__(self):
        return 'Freelance {}'.format(self.email)

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
            "URLphoto": self.URLphoto
            # do not serialize the password, its a security breach
        }
class Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.String(10), nullable=False)  # Por ejemplo: "Lunes", "Martes", etc.
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)

    def __repr__(self):
        return 'Availability {}, {}-{}'.format(self.day, self.start_time, self.end_time)
    
    def serialize(self):
        return {
            "id": self.id,
            "day": self.day,
            "start_time": self.start_time.strftime('%H:%M'), 
            "end_time": self.end_time.strftime('%H:%M'), 
        }
    
class Freelance_Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    freelance_id = db.Column(db.Integer, db.ForeignKey('freelance.id'))
    freelance_data = db.relationship(Freelance)
    availability_id = db.Column(db.Integer, db.ForeignKey('availability.id'))
    availability_data = db.relationship(Availability)

    def __repr__(self): 
        return 'Freelance {} Availability {}'.format(self.freelance_id, self.availability_id)
    
    def serialize(self):
        return {
            "id": self.id,
            "freelance_data": self.freelance_data.serialize(),
            "availability_data": self.availability_data.serialize()
        }
    
class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_data = db.relationship(User)
    freelance_id = db.Column(db.Integer, db.ForeignKey('freelance.id'))
    freelance_data = db.relationship(Freelance)
    day = db.Column(db.String(10), nullable=False)  # Por ejemplo: "Lunes", "Martes", etc.
    time = db.Column(db.Time, nullable=False)
    paid = db.Column(db.Boolean, nullable=False, default=False)

    def __repr__(self):
        return 'Appointment {}'.format(self.id)
    
    def serialize(self):
        return {
            "id": self.id,
            "user_data": self.user_data.serialize(),
            "freelance_data": self.freelance_data.serialize(), 
            "day": self.day,
            "time": self.time.strftime('%H:%M:%S'), 
            "paid": self.paid
        }