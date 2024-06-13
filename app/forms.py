from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField, HiddenField
from wtforms.validators import DataRequired, EqualTo

# LoginForm for user login
class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    userType = HiddenField('User Type', validators=[DataRequired()])  # Hidden field for userType
    submit = SubmitField('Sign In')

# SignupForm for new user registration
class SignupForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    verify_password = PasswordField('Verify Password', validators=[
        DataRequired(), EqualTo('password', message='Passwords must match')
    ])
    role = SelectField('Role', choices=[
        ('teacher', 'Teacher'), 
        ('parent', 'Parent')
    ], validators=[DataRequired()])
    submit = SubmitField('Sign Up')

# CourseForm for adding new courses
class CourseForm(FlaskForm):
    name = StringField('Course Name', validators=[DataRequired()])
    submit = SubmitField('Add Course')

# StudentResultForm for adding student results
class StudentResultForm(FlaskForm):
    student_id = SelectField('Student', coerce=int, validators=[DataRequired()])
    course_id = SelectField('Course', coerce=int, validators=[DataRequired()])
    score = StringField('Score', validators=[DataRequired()])
    submit = SubmitField('Add Result')

# StudentForm for adding new students
class StudentForm(FlaskForm):
    name = StringField('Student Name', validators=[DataRequired()])
    submit = SubmitField('Add Student')

# AttendanceForm for recording student attendance
class AttendanceForm(FlaskForm):
    student_id = SelectField('Student', coerce=int, validators=[DataRequired()])
    date = StringField('Date', validators=[DataRequired()])
    status = StringField('Status', validators=[DataRequired()])
    submit = SubmitField('Submit')

# NotificationForm for sending notifications
class NotificationForm(FlaskForm):
    message = StringField('Message', validators=[DataRequired()])
    submit = SubmitField('Send Notification')
