from flask import Flask
from .views.rstudent import rstudent
from .views.rteacher import rteacher
from .views.rparent import rparent

app = Flask(__name__)
app.register_blueprint(rstudent, url_prefix="")
app.register_blueprint(rteacher, url_prefix="")
app.register_blueprint(rparent, url_prefix="")

if __name__ == "__main__":
    app.run(debug=True)