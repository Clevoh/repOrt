from flask import Blueprint, request, jsonify
from models.parent import Parent

rparent = Blueprint("rparent", __name__)

@rparent.route("/register-parent", strict_slashes=False, methods=["POST", "GET"])
def parent():
    # student_info = {}
    if request.method == "POST":
        data = request.get_json()
        if data:
            new_parent = Parent(**data)
            new_parent.save()
            return jsonify("Parent has successfully registered")
    return jsonify("failed registration")