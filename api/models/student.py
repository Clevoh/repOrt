from werkzeug.security import check_password_hash, generate_password_hash
from . import db

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(80), nullable=False)
    lastname =  db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(80), nullable=False)
    sclass = db.Column(db.String(80), nullable=False)
    dateofbirth = db.Column(db.String(80), nullable=False)
    religion = db.Column(db.String(80), nullable=False)
    address = db.Column(db.String(80), nullable=False)
    bloodgroup = db.Column(db.String(80), nullable=False)
    sclass = db.Column(db.String(80), nullable=False)
    attendances = db.relationship('Attendance', backref='student', lazy=True)  
    # Relationship to Attendance

    def __repr__(self):
        return f'<Student {self.name}>'

    def save(self):
        db.session.add(self)
        db.session.commit()