from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from config import Config
from flask_cors import CORS
from flask_session import Session

db = SQLAlchemy()
socketio = SocketIO()


def create_app(config_class=Config):
    app = Flask(__name__)

    CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.config.from_object(config_class)

    # Session
    Session(app)

    db.init_app(app)

    socketio.init_app(app, cors_allowed_origins="*")

    from app.routes.auth import auth_bp
    from app.routes.poem import poem_bp
    from app.routes.history import history_bp

    app.register_blueprint(poem_bp, url_prefix="/api/poem")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(history_bp, url_prefix="/api/history")

    return app
