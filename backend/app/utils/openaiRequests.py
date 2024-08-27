from openai import OpenAI

client = OpenAI()
from flask import current_app
import json


def generate_poem(prompt):
    client.api_key = current_app.config["OPENAI_API_KEY"]
    response = client.chat.completions.create(
        model="gpt-4o-mini", messages=[{"role": "user", "content": prompt}], stream=True
    )
    for chunk in response:
        if "choices" in chunk and len(chunk["choices"]) > 0:
            if (
                "delta" in chunk["choices"][0]
                and "content" in chunk["choices"][0]["delta"]
            ):
                yield chunk["choices"][0]["delta"]["content"]


def analyze_emotions(poem):
    client.api_key = current_app.config["OPENAI_API_KEY"]

    prompt = (
        "Please analyze the following poem and return the dominant emotions in a structured JSON format "
        "with emotion names as keys and their intensity (as a percentage) as values. Poem:\n\n"
        f"{poem}"
    )

    response = client.chat.completions.create(
        model="gpt-4o-mini", messages=[{"role": "user", "content": prompt}]
    )

    emotions = "happy"
    # emotions = response["choices"][0]["message"]["content"].strip()

    try:
        emotions_dict = json.loads(emotions)
    except ValueError:

        emotions_dict = {
            "error": "Failed to parse emotions. Response was not in JSON format.",
            "raw_response": emotions,
        }

    return emotions_dict
