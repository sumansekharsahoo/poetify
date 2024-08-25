from flask import Blueprint, request, jsonify, session
from functools import wraps

# from flask_login import login_user, logout_user, login_required, current_user
from app.models import User
from app import db
import hashlib

auth_bp = Blueprint("auth", __name__)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session:
            return jsonify({"message": "Unauthorized"}), 401
        return f(*args, **kwargs)

    return decorated_function


def get_current_user():
    if "user_id" in session:
        user_id = session["user_id"]
        user = User.query.filter_by(id=user_id).first()
        return user
    return None


def generate_password_hash(password):
    sha256 = hashlib.sha256()
    sha256.update(password.encode("utf-8"))
    hash_value = sha256.hexdigest()
    return hash_value


def check_password_hash(password_hash, password):
    return password_hash == generate_password_hash(password)


@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    password_hash = generate_password_hash(password)

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "Email already registered"}), 409
    else:
        new_user = User(name=name, email=email, password_hash=password_hash)
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id

    return jsonify({"message": "Account created successfully"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password_hash, password):
        session["user_id"] = user.id
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Login failed. Check your credentials"}), 401


@auth_bp.route("/logout", methods=["POST"])
@login_required
def logout():
    session.pop("user_id", None)
    return jsonify({"message": "Logout successful"}), 200


@auth_bp.route("/currentUser", methods=["GET"])
@login_required
def currentUser():
    user = get_current_user()
    if user:
        return jsonify({"name": user.name, "email": user.email}), 200
    else:
        return jsonify({"message": "User not found"}), 404


# @auth_bp.route("/forgotPassword", methods=["POST"])
# def forgotPassword():
#     data = request.get_json()
#     email = data.get("email")
#     new_password = data.get("new_password")
#     password_hash = generate_password_hash(new_password)

#     user = User.query.filter_by(email=email).first()

#     if user:
#         user.password_hash = password_hash
#         db.session.commit()
#         return jsonify({"message": "Password updated successfully"}), 200
#     else:
#         return jsonify({"message": "User not found"}), 404


@auth_bp.route("/hello")
def hello():
    return jsonify({"message": "Hello"})
