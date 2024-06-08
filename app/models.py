from . import db
from datetime import datetime
from flask_login import UserMixin

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), nullable=False)

    # Add is_active attribute
    is_active = db.Column(db.Boolean(), default=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.role}')"
    
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    results = db.relationship('StudentResult', backref='student', lazy=True)  # Relationship to StudentResult
    attendances = db.relationship('Attendance', backref='student', lazy=True)  # Relationship to Attendance
    notifications = db.relationship('Notification', backref='student', lazy=True)  # Relationship to Notification

    def __repr__(self):
        return f'<Student {self.name}>'

class StudentResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    score = db.Column(db.Float, nullable=False)
    date_recorded = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f'<StudentResult {self.student_id} {self.course_id} {self.score}>'

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    results = db.relationship('StudentResult', backref='course', lazy=True)  # Relationship to StudentResult

    def __repr__(self):
        return f'<Course {self.name}>'
    
class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f'<Attendance {self.student_id} {self.date} {self.status}>'

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    message = db.Column(db.String(200), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f'<Notification {self.student_id} {self.message}>'

class ParentStudent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)

    parent = db.relationship('User', backref=db.backref('parent_students', lazy=True))
    student = db.relationship('Student', backref=db.backref('parent_students', lazy=True))
