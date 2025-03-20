const recordButton = document.getElementById("record");

const stopButton = document.getElementById("stop");

// Initalize a global source variable that can be referrenced in both functions
let mediaStream;
let recorder;
let intervalId;

async function sendAudio(audio_data) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(audio_data);

        reader.onloadend = () => {
            const base64 = reader.result;

            chrome.runtime.sendMessage(base64, (response) => {
                console.log(response);
                resolve(response);
            })
        }
    })
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

            // Creates the audio context and the stream
            const output = new AudioContext();
            source = output.createMediaStreamSource(stream);
            source.connect(output.destination);
            mediaStream = stream;

            recorder = new MediaRecorder(stream, {mimeType: "audio/webm"});

            recorder.ondataavailable = (event) => {
                // Handle the recorded audio data (e.g., save it)
                sendAudio(event.data);
            };

            recorder.onstop = (event) => {
                if (recorder.state === 'inactive') {
                    recorder.start();
                }
            }

            intervalId = setInterval(() => {
                recorder.stop();
            }, 2000)

            recorder.start();
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
