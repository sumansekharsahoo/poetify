from flask import Blueprint, request, jsonify, session

# from flask_login import login_required, current_user
from app import db
from app.models import Prompt


poem_bp = Blueprint("poem", __name__)


@poem_bp.route("/generatePoem", methods=["POST"])
def generatePoem():
    data = request.get_json()
    prompt = data.get("prompt")
    poem = "This is a poem"
    emotions = "Happy"
    new_prompt = Prompt(
        prompt=prompt, poem=poem, emotions=emotions, user_id=session["user_id"]
    )
    db.session.add(new_prompt)
    db.session.commit()

    return jsonify({"message": "Prompt saved successfully"}), 201
