from flask import Blueprint, request, jsonify, session
from flask_socketio import emit
from app.utils.openaiRequests import generate_poem, analyze_emotions
from app import socketio, db
from app.models import Prompt, User
from functools import wraps


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


poem_bp = Blueprint("poem", __name__)


@socketio.on("generate_poem")
def generate_poem_event(data):
    print("Socket connection established")
    prompt = data.get("prompt")
    print(prompt)
    poem = ""

    for chunk in generate_poem(prompt):
        poem += chunk
        emit("poem_chunk", {"chunk": chunk})

    # emotions = analyze_emotions(poem)
    emotions = "analyze_emotions(poem)"

    new_entry = Prompt(
        prompt=prompt, poem=poem, emotions="emotions", user_id=session["user_id"]
    )
    db.session.add(new_entry)
    db.session.commit()

    emit("poem_complete", {"poem": poem, "emotions": "emotions"})
