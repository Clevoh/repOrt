from flask import Blueprint, request, jsonify
from models.teacher import Teacher

rteacher = Blueprint("rteacher", __name__)

@rteacher.route("/register-teacher", strict_slashes=False, methods=["POST", "GET"])
def teacher():
    # student_info = {}
    if request.method == "POST":
        data = request.get_json()
        if data:
            new_teacher = Teacher(**data)
            new_teacher.save()
            return jsonify("Teacher has successfully registered")
    return jsonify("failed registration")