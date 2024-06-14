from views import bp_views
from flask import request, jsonify, abort
import json
from api.models.admin import Admin
from api.models.teacher import Teacher


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
            admin = admin.query.filter_by(username=username).first()
            if admin and admin.check_password(password):
                return (jsonify({"message":"succesfully logged in"}), 200)
        elif data["role"] == "teacher":
            teacher = teacher.query.filter_by(username=username).first()
            if teacher and teacher.check_password(password):
                return (jsonify({"message":"succesfully logged in"}), 200)

    abort(404)

    @bp_views.route("/register", methods=["GET", "POST"])