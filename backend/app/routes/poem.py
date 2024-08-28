from flask import Blueprint, request, jsonify, session
from flask_socketio import emit
from app.utils.openaiRequests import generate_poem, analyze_emotions
from app import socketio, db
from app.models import Prompt, User, Emotion
from functools import wraps


poem_bp = Blueprint("poem", __name__)


@socketio.on("connect")
def connect():
    print("Socket connection established")


@socketio.on("generate_poem")
def generate_poem_event(data):
    print("Socket connection established")
    prompt = data.get("prompt")
    user_id = data.get("user_id")
    print("user is" + user_id)
    if not prompt:
        emit("error", {"message": "No prompt provided"})
        return
    print(prompt)
    poem = ""

    for chunk in generate_poem(prompt):
        poem += chunk
        emit("poem_chunk", {"chunk": chunk})

    # emotions = analyze_emotions(poem)
    emotions = analyze_emotions(poem)
    print("Here it is:  ")
    print(session)

    latest_emotion = Emotion.query.order_by(Emotion.id.desc()).first()
    next_emotion_id = latest_emotion.id + 1 if latest_emotion else 1
    new_entry = Prompt(
        prompt=prompt, poem=poem, emotion_id=next_emotion_id, user_id=user_id
    )
    db.session.add(new_entry)
    db.session.commit()

    try:
        anger = emotions["Anger"]
    except:
        anger = 0

    try:
        sadness = emotions["Sadness"]
    except:
        sadness = 0

    try:
        disgust = emotions["Disgust"]
    except:
        disgust = 0

    try:
        fear = emotions["Fear"]
    except:
        fear = 0

    try:
        joy = emotions["Joy"]
    except:
        joy = 0

    latest_prompt = Prompt.query.order_by(Prompt.id.desc()).first()
    new_emo = Emotion(
        anger=anger,
        sadness=sadness,
        disgust=disgust,
        fear=fear,
        joy=joy,
        prompt_id=latest_prompt.id,
    )
    db.session.add(new_emo)
    db.session.commit()
    emit(
        "poem_complete",
        {
            "poem": poem,
            "joy": joy,
            "anger": anger,
            "sadness": sadness,
            "disgust": disgust,
            "fear": fear,
        },
    )
