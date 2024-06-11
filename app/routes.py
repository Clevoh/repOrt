from . import db
from datetime import datetime
from flask_login import UserMixin

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    is_active = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.role}')"

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    results = db.relationship('StudentResult', backref='student', lazy=True)
    attendances = db.relationship('Attendance', backref='student', lazy=True)
    notifications = db.relationship('Notification', backref='student', lazy=True)

    def __repr__(self):
        return f'<Student {self.name}>'
    
class Teacher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey('class.id'), nullable=False)

class Class(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    teacher = db.relationship('Teacher', backref='class', uselist=False)
    students = db.relationship('Student', backref='class', lazy=True)

class StudentResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    score = db.Column(db.Float, nullable=False)
    date_recorded = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f'<StudentResult StudentID: {self.student_id}, CourseID: {self.course_id}, Score: {self.score}>'

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    results = db.relationship('StudentResult', backref='course', lazy=True)

    def __repr__(self):
        return f'<Course {self.name}>'

class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    student = db.relationship('Student', backref='attendance', lazy=True)

    def __repr__(self):
        return f'<Attendance StudentID: {self.student_id}, Date: {self.date}, Status: {self.status}>'

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    message = db.Column(db.String(200), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f'<Notification StudentID: {self.student_id}, Message: {self.message}>'

class ParentStudent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)

    parent = db.relationship('User', backref=db.backref('parent_students', lazy=True))
    student = db.relationship('Student', backref=db.backref('parent_students', lazy=True))

    def __repr__(self):
        return f'<ParentStudent ParentID: {self.parent_id}, StudentID: {self.student_id}>'
