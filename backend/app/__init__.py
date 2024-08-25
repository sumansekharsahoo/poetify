from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db = SQLAlchemy()
login_manager = LoginManager()


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object("config.Config")

    db.init_app(app)
    login_manager.init_app(app)

    from app.routes.auth import auth_bp
    from app.routes.poem import poem_bp
    from app.routes.history import history_bp

    app.register_blueprint(poem_bp, url_prefix="/api/poem")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(history_bp, url_prefix="/api/history")

    return app
