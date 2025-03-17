from google.cloud import speech
from google.oauth2 import service_account
from flask import Flask, jsonify
import json

app = Flask(__name__)
service_account_info = json.load(open('google_cloud_speech_api.json'))
cred = service_account.Credentials.from_service_account_info(service_account_info)

@app.route('/speech_to_text')
def speech_to_text():
    run_quickstart()
    return True

def run_quickstart() -> speech.RecognizeResponse:
    # Instantiates a client
    client = speech.SpeechClient(credentials=cred)

    # The name of the audio file to transcribe
    gcs_uri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw"

    audio = speech.RecognitionAudio(uri=gcs_uri)

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-US",
    )

    # Detects speech in the audio file
    response = client.recognize(config=config, audio=audio)

    for result in response.results:
        print(f"Transcript: {result.alternatives[0].transcript}")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
