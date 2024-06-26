from werkzeug.security import check_password_hash, generate_password_hash
from . import db

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(80), nullable=False)
    lastname =  db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), nullable=False)
    dateofbirth = db.Column(db.String(80), nullable=False)
    religion = db.Column(db.String(80), nullable=False)
    address = db.Column(db.String(80), nullable=False)
    bloodgroup = db.Column(db.String(80), nullable=False)
    hash_password = db.Column(db.String(240), nullable=False)

    def __repr__(self):
        return f'<Teacher {self.username}>'

    def hashing_password(self, password):
        self.hash_password = generate_password_hash(password)
        # return self.hash_password
    
    def check_password(self, password):
        return check_password_hash(self.hash_password, password)
    
    def save(self):
        db.session.add(self)
        db.session.commit()
