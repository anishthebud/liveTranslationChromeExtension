const recordButton = document.getElementById("record");

const stopButton = document.getElementById("stop");

// Initalize a global source variable that can be referrenced in both functions
let mediaStream;

recordButton.addEventListener("click", () => {
    // Make the record button disappear and stop button appear
    recordButton.style.display = 'none';
    stopButton.style.display = 'block';
    // Start recording audio
    chrome.tabCapture.capture(
        { audio: true },
        (stream) => {
            if (!stream) {
                console.log("no audio is coming out");
                return;
            }

            console.log("audio is coming: ", stream)

            // Gets the audio
            const output = new AudioContext();
            source = output.createMediaStreamSource(stream);
            source.connect(output.destination);
            mediaStream = stream;
        }
    )
    // source.connect(output.destination);
})

stopButton.addEventListener("click", () => {
    // chrome.tabCapture.getMediaStreamId()
    // Make the stop button disapper and record button appear
    stopButton.style.display = 'none';
    recordButton.style.display = 'block';
    // Stop recording the audio from the tab
    const tracks = mediaStream.getTracks();
    console.log(tracks)
    tracks.forEach(track => track.stop())
})
