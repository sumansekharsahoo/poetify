from flask import Blueprint, jsonify, session, request
from app.models import Prompt, Emotion

history_bp = Blueprint("history", __name__)


@history_bp.route("/getChats", methods=["POST"])
def history():
    data = request.get_json()
    user_id = data["user_id"]

    history = Prompt.query.filter_by(user_id=user_id).all()
    return (
        jsonify(
            [
                {
                    "id": entry.id,
                    "prompt": entry.prompt,
                    "timestamp": entry.timestamp,
                }
                for entry in history
            ]
        ),
        200,
    )


@history_bp.route("/ping", methods=["GET"])
def ping():
    return jsonify({"message": "Pong"}), 200


@history_bp.route("/getPoem", methods=["POST"])
def getPoem():
    data = request.get_json()
    prompt_id = data["prompt_id"]
    print(prompt_id)
    # return jsonify({"message": "Poem"}), 200
    prompt = Prompt.query.filter_by(id=prompt_id).first()
    emotion = Emotion.query.filter_by(prompt_id=prompt_id).first()
    return (
        jsonify(
            {
                "prompt": prompt.prompt,
                "poem": prompt.poem,
                "anger": emotion.anger,
                "sadness": emotion.sadness,
                "disgust": emotion.disgust,
                "fear": emotion.fear,
                "joy": emotion.joy,
                "time": prompt.timestamp,
            }
        ),
        200,
    )
