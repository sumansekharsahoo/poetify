from openai import OpenAI
from config import Config
import json


def generate_poem(prompt):
    client = OpenAI(api_key=Config.OPENAI_API_KEY)
    # client.api_key = current_app.config["OPENAI_API_KEY"]
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": (
                    f"Generate a poem based on the following prompt:\n\n{prompt}\n\n"
                    "Please provide the poem in plain text without any markdown formatting."
                ),
            }
        ],
        stream=True,
    )
    for chunk in response:
        chunk_message = chunk.choices[0].delta.content
        if chunk_message:

            yield chunk_message

    # yield "Poem generation completed."


def analyze_emotions(poem):
    client = OpenAI(api_key=Config.OPENAI_API_KEY)

    prompt = (
        "Analyze the following poem and return the dominant emotions in a structured JSON format (do not prefix any other text before the json object) "
        "with emotion names as keys and their intensity as percentages. Emotions should include: "
        "Anger, Sadness, Disgust, Fear, and Joy. Poem:\n\n"
        f"{poem}"
    )
    # print(poem)
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        stream=False,
    )

    emotions = response.choices[0].message.content

    try:
        emotions_dict = json.loads(emotions)
    except ValueError:
        emotions_dict = {
            "error": "Failed to parse emotions. Response was not in JSON format.",
            "raw_response": emotions,
        }

    print(emotions_dict)
    return emotions_dict


#     client.api_key = current_app.config["OPENAI_API_KEY"]

#     prompt = (
#         "Please analyze the following poem and return the dominant emotions in a structured JSON format "
#         "with emotion names as keys and their intensity (as a percentage) as values. Poem:\n\n"
#         f"{poem}"
#     )

#     response = client.chat.completions.create(
#         model="gpt-4o-mini", messages=[{"role": "user", "content": prompt}]
#     )

#     emotions = "happy"
#     # emotions = response["choices"][0]["message"]["content"].strip()

#     try:
#         emotions_dict = json.loads(emotions)
#     except ValueError:

#         emotions_dict = {
#             "error": "Failed to parse emotions. Response was not in JSON format.",
#             "raw_response": emotions,
#         }

#     return emotions_dict
