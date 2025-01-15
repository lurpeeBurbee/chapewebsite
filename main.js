document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("videofile");
  const progressBar = document.getElementById("progress");
  const counter = document.getElementById("counter");

  const rewindButton = document.getElementById("rewind");
  const playButton = document.getElementById("play");
  const forwardButton = document.getElementById("forward");

  // Play button functionality
  playButton.addEventListener("click", () => {
      if (video.paused) {
          video.play();
          playButton.textContent = "⏸️"; // Change to pause icon
      } else {
          video.pause();
          playButton.textContent = "▶️"; // Change back to play icon
      }
  });

  // Rewind functionality
  rewindButton.addEventListener("click", () => {
      video.currentTime -= 5; // Rewind 5 seconds
  });

  // Forward functionality
  forwardButton.addEventListener("click", () => {
      video.currentTime += 5; // Forward 5 seconds
  });

  // Update progress bar and counter
  video.addEventListener("timeupdate", () => {
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${progress}%`;
      counter.textContent = `${Math.floor(progress)}%`;
  });

  // Reset progress when the video ends
  video.addEventListener("ended", () => {
      playButton.textContent = "▶️";
      counter.textContent = "0%";
      progressBar.style.width = "0%";
  });
});
