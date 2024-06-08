from flask import request, render_template, redirect, url_for, flash, session, g, current_app
from flask_login import login_user, logout_user, login_required, current_user
from functools import wraps
from . import db, login_manager
from .forms import LoginForm, SignupForm, CourseForm, StudentResultForm, StudentForm, AttendanceForm, NotificationForm
from .models import User, Student, Course, Attendance, StudentResult, Notification, ParentStudent
from werkzeug.security import generate_password_hash, check_password_hash
from .login_logic import admin_login, teacher_login, parent_login

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.role == 'admin':
            flash('Access Denied! Only admin can view this page.', 'danger')
            return redirect(url_for('home'))
        return f(*args, **kwargs)
    return decorated_function

def teacher_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.role == 'teacher':
            flash('Access Denied! Only teachers can view this page.', 'danger')
            return redirect(url_for('home'))
        return f(*args, **kwargs)
    return decorated_function

def parent_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.role == 'parent':
            flash('Access Denied! Only parents can view this page.', 'danger')
            return redirect(url_for('home'))
        return f(*args, **kwargs)
    return decorated_function

def register_routes(app):
    @app.route('/home', methods=['POST', 'GET'])
    @app.route('/')
    def home():
        title = 'Home'
        return render_template('home_page.html', title=title)

    @app.route('/signup', methods=['GET', 'POST'])
    def signup():
        form = SignupForm()
        title = 'Sign Up'
        if form.validate_on_submit():
            hashed_password = generate_password_hash(form.password.data)
            new_user = User(username=form.username.data, password=hashed_password, role=form.role.data)
            db.session.add(new_user)
            db.session.commit()
            flash('Registration successful!', 'success')
            return redirect(url_for('login'))
        return render_template('sign_up.html', title=title, form=form)

    @app.route('/login', methods=['GET', 'POST'])
    def login():
        form = LoginForm()
        title = 'Sign In'
        if form.validate_on_submit():
            username = form.username.data
            password = form.password.data
            user_type = request.form.get('userType')  # Get user type from the form
            
            print(f"Attempting login for user: {username} with role: {user_type}")
            
            if user_type == 'admin':
                redirect_url = admin_login(username, password)
            elif user_type == 'teacher':
                redirect_url = teacher_login(username, password)
            elif user_type == 'parent':
                redirect_url = parent_login(username, password)
            else:
                flash('Invalid user type', 'danger')
                return redirect(url_for('login'))

            if redirect_url:
                flash('Login successful!', 'success')
                return redirect(redirect_url)
            else:
                flash('Invalid credentials', 'danger')
                return redirect(url_for('login'))
        else:
            # Print the form data and errors for debugging purposes
            print("Form validation failed")
            print("Form data:", request.form)
            print("Form errors:", form.errors)

        return render_template('sign_in.html', title=title, form=form)
                           
    @app.route('/logout')
    def logout():
        logout_user()
        flash('You have been logged out.', 'info')
        return redirect(url_for('login'))

    @app.before_request
    def load_logged_in_user():
        g.user = current_user

    @app.route('/admin-dashboard')
    @login_required
    @admin_required
    def admin_dashboard():
        return render_template('admin_dashboard.html')

    @app.route('/post_notification', methods=['GET', 'POST'])
    @login_required
    @admin_required
    def post_notification():
        form = NotificationForm()
        if form.validate_on_submit():
            notification = Notification(student_id=form.student_id.data, message=form.message.data)
            db.session.add(notification)
            db.session.commit()
            flash('Notification posted successfully!', 'success')
            return redirect(url_for('admin_dashboard'))
        return render_template('post_notification.html', form=form)

    @app.route('/add_student', methods=['GET', 'POST'])
    @login_required
    def add_student():
        form = StudentForm()
        if form.validate_on_submit():
            student = Student(name=form.name.data)
            db.session.add(student)
            db.session.commit()
            return redirect(url_for('add_student'))
        return render_template('add_student.html', form=form)

    @app.route('/add_course', methods=['GET', 'POST'])
    @login_required
    def add_course():
        form = CourseForm()
        if form.validate_on_submit():
            course = Course(name=form.name.data)
            db.session.add(course)
            db.session.commit()
            return redirect(url_for('add_course'))
        return render_template('add_course.html', form=form)

    @app.route('/add_student_result', methods=['GET', 'POST'])
    @login_required
    @teacher_required
    def add_student_result():
        form = StudentResultForm()
        form.student_id.choices = [(student.id, student.name) for student in Student.query.all()]
        form.course_id.choices = [(course.id, course.name) for course in Course.query.all()]

        if form.validate_on_submit():
            student_result = StudentResult(
                student_id=form.student_id.data,
                course_id=form.course_id.data,
                score=form.score.data
            )
            db.session.add(student_result)
            db.session.commit()
            return redirect(url_for('add_student_result'))
        return render_template('add_student_result.html', form=form)

    @app.route('/results')
    def view_results():
        results = db.session.query(StudentResult, Student, Course).join(Student, StudentResult.student_id == Student.id).join(Course, StudentResult.course_id == Course.id)
        return render_template('results.html', results=results)

    @app.route('/attendance', methods=['GET', 'POST'])
    @login_required
    def take_attendance():
        form = AttendanceForm()
        form.student_id.choices = [(student.id, student.name) for student in Student.query.all()]

        if form.validate_on_submit():
            attendance = Attendance(
                student_id=form.student_id.data,
                date=form.date.data,
                status=form.status.data
            )
            db.session.add(attendance)
            db.session.commit()
            flash('Attendance recorded successfully!', 'success')
            return redirect(url_for('take_attendance'))
        return render_template('attendance.html', form=form)

    @app.route('/view_notifications/<int:student_id>', methods=['GET'])
    @login_required
    @parent_required
    def view_notifications(student_id):
        student = Student.query.get_or_404(student_id)
        notifications = Notification.query.filter_by(student_id=student.id).order_by(Notification.date_created.desc()).all()
        return render_template('view_notifications.html', student=student, notifications=notifications)

    @app.route('/view_results/<int:student_id>', methods=['GET'])
    @login_required
    @parent_required
    def view_student_results(student_id):
        student = Student.query.get_or_404(student_id)
        results = StudentResult.query.filter_by(student_id=student.id).order_by(StudentResult.date_recorded.desc()).all()
        return render_template('view_results.html', student=student, results=results)

    @app.route('/view_attendance/<int:student_id>', methods=['GET'])
    @login_required
    @parent_required
    def view_attendance(student_id):
        student = Student.query.get_or_404(student_id)
        attendance_records = Attendance.query.filter_by(student_id=student.id).order_by(Attendance.date.desc()).all()
        return render_template('view_attendance.html', student=student, attendance_records=attendance_records)

    @app.route('/teacher_dashboard')
    @login_required
    def teacher_dashboard():
        if current_user.role != 'teacher':
            flash('Access denied', 'danger')
            return redirect(url_for('home'))
        return render_template('teacher_dashboard.html')

    return app
