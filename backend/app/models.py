from app import db
from flask_login import UserMixin
from datetime import datetime


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False, unique=False)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password_hash = db.Column(db.String(150), nullable=False)
    prompts = db.relationship("Prompt", backref="author", lazy=True)


class Prompt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prompt = db.Column(db.Text, nullable=False)
    poem = db.Column(db.Text, nullable=False)
    emotion_id = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)


class Emotion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    anger = db.Column(db.Integer, nullable=False)
    sadness = db.Column(db.Integer, nullable=False)
    disgust = db.Column(db.Integer, nullable=False)
    fear = db.Column(db.Integer, nullable=False)
    joy = db.Column(db.Integer, nullable=False)
    prompt_id = db.Column(db.Integer, db.ForeignKey("prompt.id"), nullable=False)
