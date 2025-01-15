const video = document.getElementById("videofile");
const counter = document.getElementById("counter");
const playButton = document.getElementById("play");
const rewindButton = document.getElementById("rewind");
const forwardButton = document.getElementById("forward");
const progressBar = document.getElementById("progress");

// Update progress and UI
const updateCounter = (percentage) => {
  const displayPercentage = Math.min(100, Math.floor(percentage)); // Limit to 100%

  // Update counter text
  counter.textContent = `${displayPercentage}%`;

  // Apply gradient based on progress
  const icyBlue = `rgb(${Math.floor(255 - displayPercentage * 2.55)}, ${Math.floor(255 - displayPercentage * 1.5)}, 255)`; // Icy Blue
  const warmRed = `rgb(${Math.floor(displayPercentage * 2.55)}, 0, 0)`; // Warm Red

  progressBar.style.width = `${displayPercentage}%`;
  progressBar.style.background = `linear-gradient(to right, ${icyBlue}, ${warmRed})`;
};

// Play/Pause video
playButton.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playButton.textContent = "⏸️";
  } else {
    video.pause();
    playButton.textContent = "▶️";
  }
});

// Rewind video
rewindButton.addEventListener("click", () => {
  video.currentTime = Math.max(0, video.currentTime - 1); // Rewind by 1 second
  updateCounter((video.currentTime / video.duration) * 100);
});

// Fast forward video
forwardButton.addEventListener("click", () => {
  video.currentTime = Math.min(video.duration, video.currentTime + 1); // Fast forward by 1 second
  updateCounter((video.currentTime / video.duration) * 100);
});

// Sync counter and progress bar while video plays
video.addEventListener("timeupdate", () => {
  updateCounter((video.currentTime / video.duration) * 100);
});

// Play video immediately when metadata is loaded
video.addEventListener("loadedmetadata", () => {
  updateCounter((video.currentTime / video.duration) * 100);
  video.play(); // Start playing the video automatically
  playButton.textContent = "⏸️"; // Update play button to match the playing state
});
