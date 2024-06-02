from flask import Blueprint, request, jsonify
from models.student import Student

rstudent = Blueprint("rstudent", __name__)

@rstudent.route("/register-student", strict_slashes=False, methods=["POST", "GET"])
def student():
    # student_info = {}
    if request.method == "POST":
        data = request.get_json()
        if data:
            new_student = Student(**data)
            new_student.save()
            return jsonify("Student has successfully registered")
    return jsonify("failed registration")