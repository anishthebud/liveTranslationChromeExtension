import base64
from google.cloud import speech
from google.oauth2 import service_account
from flask import Flask, request, jsonify
import json

app = Flask(__name__)
service_account_info = json.load(open('google_cloud_speech_api.json'))
cred = service_account.Credentials.from_service_account_info(service_account_info)

@app.route('/speech_to_text', methods=["POST"])
def speech_to_text():
    # Instantiates a client
    client = speech.SpeechClient(credentials=cred)

    # Get the audio data
    data = request.get_json()
    audio = data["audio_data"]
    audio = audio.replace("data:audio/webm;codecs=opus;base64,", "")
    audio = base64.b64decode(audio)
    audio = {"content": audio}

    # Configure the speech reader
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.WEBM_OPUS,
        sample_rate_hertz=48000,
        language_code="en-US",
        audio_channel_count = 2
    )

    # Detects speech in the audio file
    response = client.recognize(config=config, audio=audio)

    for result in response.results:
        print(result.alternatives[0].transcript)

    # Send the transcript to the background operation
    if not (response.results):
        message = {"transcipt": ""}
    else: 
        message = {"transcript": response.results[0].alternatives[0].transcript}

    return jsonify(message)
    

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
