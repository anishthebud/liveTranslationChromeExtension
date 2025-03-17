/*
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

process.env.GOOGLE_APPLICATION_CREDENTIALS='google_cloud_speech_api.json';

// Creates a client
const client = new speech.SpeechClient();

// Function that transcibes audio into text
async function transcribeAudio() {
  console.log("transcribe audio function ran")
}

async function fetchMediaStream() {

}

chrome.runtime.onMessage.addListener((request, sendResponse) => {
    const { type, data } = request;
    if (type == audio) {
        transcribeAudio(data);
        console.log("audio transcribed");
    }
}

);
*/
/*
async function quickstart() {
  // The path to the remote LINEAR16 file
  const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    uri: gcsUri,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
}
quickstart();
*/
