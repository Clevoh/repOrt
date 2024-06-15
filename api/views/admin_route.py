from api.views import bp_views
from flask import request, jsonify, abort
import json
from api.models.admin import Admin
from api.models.teacher import Teacher
from api.models.student import Student


@bp_views.route("/login", methods=["GET", "POST"])
def login():
    """ take care of login """
    # get the request
    if request.methods == "POST":
        res = request.get_json()
        data = json.loads(res)
        username = data.get("username")
        password = data.get("password")
        if data["role"] == "admin":
            # query the database for the username, password and id
            admin = Admin.query.filter_by(username=username).first()
            if admin and admin.check_password(password):
                return (jsonify({"message":"succesfully logged in"}), 200)
        elif data["role"] == "teacher":
            teacher = Teacher.query.filter_by(username=username).first()
            if teacher and teacher.check_password(password):
                return (jsonify({"message":"succesfully logged in"}), 200)

    abort(404)

@bp_views.route("/register-student", methods=["GET", "POST"])
def register_student():
    """register students"""
    if request.method == "POST":
        data = request.get_json()
        new_student = Student(id=data.get("id"),firstname=data["firstname"] ,
                                lastname=data["lastname"], address=data["address"], gender=data["gender"], dob=data["dob"], bloodgroup=data["    bloodgroup"], religion=data["religion"],sclass=data["sclass"], username=data["username"], password=["password"])
        new_student.save()

@bp_views.route("/register-teacher", methods=["GET", "POST"])
def register_teacher():
    """register teacher"""
    if request.method == "POST":
        data = request.get_json()
        new_teacher = Teacher(id=data.get("id"),firstname=data["firstname"] ,
                           lastname=data["lastname"], address=data["address"], gender=data["gender"], dob=data["dob"], bloodgroup=data["    bloodgroup"], religion=data["religion"],sclass=data["sclass"], username=data["username"], password=["password"])
    new_teacher.save()