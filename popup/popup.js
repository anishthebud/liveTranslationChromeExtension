const recordButton = document.getElementById("record");

const stopButton = document.getElementById("stop");

recordButton.addEventListener("click", () => {
    // Make the record button disappear and stop button appear
    recordButton.style.display = 'none';
    stopButton.style.display = 'block';
    // Start recording audio
})

stopButton.addEventListener("click", () => {
    // Make the stop button disapper and record button appear
    stopButton.style.display = 'none';
    recordButton.style.display = 'block';
})
