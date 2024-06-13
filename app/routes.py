from flask import Flask, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
from . import db, login_manager
from .forms import LoginForm, SignupForm, CourseForm, StudentResultForm, StudentForm, AttendanceForm, NotificationForm
from .models import User, Student, Course, StudentResult, Notification, Attendance

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Decorator for role-based access control
def role_required(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not current_user.role == role:
                return jsonify({'error': f'Access Denied! Only {role}s can view this page.'}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# Routes
def register_routes(app):
    @app.route('/home', methods=['POST', 'GET'])
    @app.route('/')
    def home():
        title = 'Home'
        return jsonify({'message': title})

    @app.route('/signup', methods=['POST'])
    def signup():
        data = request.json
        form = SignupForm(data=data)
        if form.validate():
            try:
                hashed_password = generate_password_hash(data['password'])
                new_user = User(username=data['username'], password=hashed_password, role=data['role'])
                db.session.add(new_user)
                db.session.commit()
                return jsonify({'message': 'Registration successful!'}), 200
            except Exception as e:
                db.session.rollback()
                return jsonify({'error': 'An error occurred: ' + str(e)}), 500
        return jsonify({'error': 'Invalid form data'}), 400
    
    @app.route('/login', methods=['POST'])
    def login():
        data = request.json
        form = LoginForm(data=data)
        if form.validate():
            username = data['username']
            password = data['password']
            user_type = data.get('userType', None)  # Get user type from the JSON data

            user = User.query.filter_by(username=username).first()

            if not user or not check_password_hash(user.password, password):
                return jsonify({'error': 'Invalid credentials'}), 401

            if user.role != user_type:
                return jsonify({'error': 'Invalid user type'}), 403

            login_user(user)
            return jsonify({'userId': user.id}), 200
        else:
            return jsonify({'error': 'Invalid form data'}), 400

    @app.route('/logout')
    @login_required
    def logout():
        logout_user()
        return jsonify({'message': 'You have been logged out.'}), 200

    @app.route('/admin-dashboard')
    @login_required
    @role_required('admin')
    def admin_dashboard():
        return jsonify({'message': 'Admin dashboard'})

    @app.route('/post_notification', methods=['POST'])
    @login_required
    @role_required('admin')
    def post_notification():
        data = request.json
        form = NotificationForm(data=data)
        if form.validate():
            notification = Notification(student_id=data['student_id'], message=data['message'])
            db.session.add(notification)
            db.session.commit()
            return jsonify({'message': 'Notification posted successfully!'}), 200
        return jsonify({'error': 'Invalid form data'}), 400

    @app.route('/add_student', methods=['POST'])
    @login_required
    def add_student():
        data = request.json
        form = StudentForm(data=data)
        if form.validate():
            student = Student(name=data['name'])
            db.session.add(student)
            db.session.commit()
            return jsonify({'message': 'Student added successfully!'}), 200
        return jsonify({'error': 'Invalid form data'}), 400

    @app.route('/add_course', methods=['POST'])
    @login_required
    def add_course():
        data = request.json
        form = CourseForm(data=data)
        if form.validate():
            course = Course(name=data['name'])
            db.session.add(course)
            db.session.commit()
            return jsonify({'message': 'Course added successfully!'}), 200
        return jsonify({'error': 'Invalid form data'}), 400

    @app.route('/add_student_result', methods=['POST'])
    @login_required
    @role_required('teacher')
    def add_student_result():
        data = request.json
        form = StudentResultForm(data=data)
        if form.validate():
            form.student_id.choices = [(student.id, student.name) for student in Student.query.all()]
            form.course_id.choices = [(course.id, course.name) for course in Course.query.all()]
            student_result = StudentResult(
                student_id=data['student_id'],
                course_id=data['course_id'],
                score=data['score']
            )
            db.session.add(student_result)
            db.session.commit()
            return jsonify({'message': 'Student result added successfully!'}), 200
        return jsonify({'error': 'Invalid form data'}), 400

    @app.route('/results')
    def view_results():
        results = db.session.query(StudentResult, Student, Course).join(Student, StudentResult.student_id == Student.id).join(Course, StudentResult.course_id == Course.id)
        return jsonify({'results': [result.serialize() for result in results]})

    @app.route('/api/login', methods=['POST'])
    def api_login():
        data = request.json
        username = data.get('username')
        password = data.get('password')
        user_type = data.get('userType')

        if not username or not password or not user_type:
            return jsonify({'error': 'Missing username, password, or user type'}), 400

        user = User.query.filter_by(username=username).first()

        if not user or not check_password_hash(user.password, password):
            return jsonify({'error': 'Invalid credentials'}), 401

        if user.role != user_type:
            return jsonify({'error': 'Invalid user type'}), 403

        login_user(user)
        return jsonify({'userId': user.id}), 200

    @app.route('/take_attendance', methods=['POST'])
    @login_required
    @role_required('teacher')
    def take_attendance():
        data = request.json
        form = AttendanceForm(data=data)
        if form.validate():
            attendance = Attendance(student_id=data['student_id'], date=data['date'], status=data['status'])
            db.session.add(attendance)
            db.session.commit()
            return jsonify({'message': 'Attendance taken successfully!'}), 200
        return jsonify({'error': 'Invalid form data'}), 400

    @app.route('/view_attendance', methods=['GET'])
    @login_required
    def view_attendance():
        attendances = Attendance.query.all()
        return jsonify({'attendances': [attendance.serialize() for attendance in attendances]})

    return app

