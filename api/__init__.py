from flask import Flask
from config import config
from dotenv import load_dotenv
# from flask_login import LoginManager
from api.views import bp_views
from api.models.admin import Admin
from api.models.student import Student
from api.models.teacher import Teacher
from api.models.attendance import Attendance
from api.models import db

# db = SQLAlchemy()
# login_manager = LoginManager()

def create_app(config_name):
    load_dotenv()

    app = Flask(__name__)

    app.config.from_object(config[config_name])

    ## register blueprint
    
    app.register_blueprint(bp_views)

    db.init_app(app)
    # login_manager.init_app(app)
    # login_manager.login_view
    #  = 'login'

    with app.app_context():
        # from .routes import register_routes  # Updated import statement
        # register_routes(app)
        db.create_all()

    return app