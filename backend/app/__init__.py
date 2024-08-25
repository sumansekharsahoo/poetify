from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO

# from flask_login import LoginManager
from config import Config
from flask_cors import CORS
from flask_session import Session

db = SQLAlchemy()
socketio = SocketIO()
# login_manager = LoginManager()


def create_app(config_class=Config):
    app = Flask(__name__)
    # app = Flask(__name__, instance_relative_config=True)
    # app.config.from_object("config.Config")

    CORS(
        app,
        resources={r"/*": {"origins": "*"}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
    )
    app.config.from_object(config_class)
    # config_class.init_app(app)

    # Session
    Session(app)

    db.init_app(app)
    # login_manager.init_app(app)
    socketio.init_app(app, cors_allowed_origins="*")

    from app.routes.auth import auth_bp
    from app.routes.poem import poem_bp
    from app.routes.history import history_bp

    app.register_blueprint(poem_bp, url_prefix="/api/poem")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(history_bp, url_prefix="/api/history")

    return app
