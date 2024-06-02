from flask import Flask
from .views.rstudent import rstudent

app = Flask(__name__)
app.register_blueprint(rstudent, url_prefix="")

if __name__ == "__main__":
    app.run(debug=True)