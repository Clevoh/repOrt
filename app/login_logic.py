# app/login_logic.py
from werkzeug.security import check_password_hash
from app.models import User
from flask import url_for
from flask_login import login_user

def admin_login(username, password):
    user = User.query.filter_by(username=username, role='admin').first()
    if user and check_password_hash(user.password, password):
        login_user(user)
        return url_for('admin_dashboard')
    return None

def teacher_login(username, password):
    user = User.query.filter_by(username=username, role='teacher').first()
    if user and check_password_hash(user.password, password):
        login_user(user)
        return url_for('teacher_dashboard')
    return None

def parent_login(username, password):
    user = User.query.filter_by(username=username, role='parent').first()
    if user and check_password_hash(user.password, password):
        login_user(user)
        return url_for('home')
    return None
