// contentScript.js
window.onload = function() {
    let likeButton = document.querySelector('yt-spec-touch-feedback-shape__fill');
    if (likeButton) {
      let summarizeButton = document.createElement('button');
      summarizeButton.innerHTML = 'Summarize Video';
      summarizeButton.onclick = summarizeVideo;
      likeButton.parentNode.insertBefore(summarizeButton, likeButton.nextSibling);
    }
  }
  
  function summarizeVideo() {
    // Your summarization code here
  }
  