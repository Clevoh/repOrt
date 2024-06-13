from werkzeug.security import check_password_hash
from . import db

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    results = db.relationship('StudentResult', backref='student', lazy=True)  # Relationship to StudentResult
    attendances = db.relationship('Attendance', backref='student', lazy=True)  # Relationship to Attendance
    notifications = db.relationship('Notification', backref='student', lazy=True)  # Relationship to Notification

    def __repr__(self):
        return f'<Student {self.name}>'