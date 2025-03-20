// Only message being sent is the audio blobs
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  
  fetch("http://127.0.0.1:5000/speech_to_text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      audio_data: message
    })
  })
  .then(response => {
    if (!response.ok) {
      console.log("something went wrong");
    } else {
      return response.json();
    }
  })
  .then(data => {
    sendResponse({"transcript": data.transcript});
  })
  .catch(error => console.log("Error: ", error));
  
  return true;
})
