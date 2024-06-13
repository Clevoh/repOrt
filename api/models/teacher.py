from werkzeug.security import check_password_hash, generate_password_hash
from . import db

class Teacher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(80), nullable=False)
    lastname =  db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(80), nullable=False)
    sclass = db.Column(db.String(80), nullable=False)
    dateofbirth = db.Column(db.String(80), nullable=False)
    religion = db.Column(db.String(80), nullable=False)
    address = db.Column(db.String(80), nullable=False)
    bloodgroup = db.Column(db.String(80), nullable=False)

     def __repr__(self):
        return f'<Teacher {self.name}>'

    def hash_password(self, password):
        self.hash_password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.hash_password, password)