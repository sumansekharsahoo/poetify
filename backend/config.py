from dotenv import load_dotenv
import os
from datetime import timedelta

import redis

load_dotenv()


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SESSION_TYPE = "filesystem"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    # SESSION_REDIS = redis.from_url("redis://localhost:6379")
    PERMANENT_SESSION_LIFETIME = timedelta(minutes=30)
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
