from flask import Blueprint
bp_views = Blueprint ("views", __name__)
from admin_route import *
from teacher_route import *