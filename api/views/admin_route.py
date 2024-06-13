from views import bp_views
from flask import request, jsonify, abort
import json
from api.models


@bp_views.route("/login", methods=["GET", "POST"])
def login():
    """ take care of login """
    # get the request
    if request.methods == "GET":
        res = request.get_json()
        data = json.loads(res)
        if data["role"] == "admin":
            pass
        elif data["role"] == "teacher":
            pass
        else:
            abort(404)
    return jsonify("login successful")