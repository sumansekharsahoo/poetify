from flask import Blueprint, jsonify, session
from app.models import Prompt

history_bp = Blueprint("history", __name__)


@history_bp.route("/", methods=["GET"])
def history():
    history = Prompt.query.filter_by(user_id=session["user_id"]).all()
    return (
        jsonify(
            [
                {
                    "prompt": entry.prompt,
                    "poem": entry.poem,
                    "emotions": entry.emotions,
                    "timestamp": entry.timestamp,
                }
                for entry in history
            ]
        ),
        200,
    )
