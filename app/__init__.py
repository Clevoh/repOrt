from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import config
from dotenv import load_dotenv
from flask_login import LoginManager

db = SQLAlchemy()
login_manager = LoginManager()

def create_app(config_name):
    load_dotenv()

    app = Flask(__name__, template_folder='templates', static_folder='static')
    app.config.from_object(config[config_name])

    db.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'login'

    with app.app_context():
        from .routes import register_routes  # Updated import statement
        register_routes(app)
        db.create_all()

    return app
