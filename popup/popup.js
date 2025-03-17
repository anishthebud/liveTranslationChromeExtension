const recordButton = document.getElementById("record");

const stopButton = document.getElementById("stop");

// Initalize a global source variable that can be referrenced in both functions
let mediaStream;
let recorder;
let intervalId;

async function sendAudio(audio_data) {
    console.log(audio_data);
    // const { transcribe } = await chrome.runtime.sendMessage({ audio: stream });
}

recordButton.addEventListener("click", () => {
    // Make the record button disappear and stop button appear
    recordButton.style.display = 'none';
    stopButton.style.display = 'block';
    // Start recording audio
    chrome.tabCapture.capture(
        { audio: true },
        (stream) => {
            if (!stream) {
                return;
            }
            // Gets the audio
            const output = new AudioContext();
            source = output.createMediaStreamSource(stream);
            source.connect(output.destination);
            mediaStream = stream;

            recorder = new MediaRecorder(stream);

            recorder.ondataavailable = event => {
                // Handle the recorded audio data (e.g., save it)
                const audioBlob = event.data;
                sendAudio(audioBlob);
                // console.log("Recorded audio:", audioBlob);
            };

            recorder.start();
            
            intervalId = setInterval(() => {
                recorder.requestData();
            }, 4000)
        }
    )
})

stopButton.addEventListener("click", () => {
    // chrome.tabCapture.getMediaStreamId()
    // Make the stop button disapper and record button appear
    recorder.stop();
    clearInterval(intervalId);
    stopButton.style.display = 'none';
    recordButton.style.display = 'block';
    // Stop recording the audio from the tab
    const tracks = mediaStream.getTracks();
    tracks.forEach(track => track.stop())
})
