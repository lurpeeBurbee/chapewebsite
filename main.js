// Get video element and controls
const video = document.getElementById("myVideo");
const container = document.getElementById("videoContainer");
const counter = document.getElementById("counter");
const playButton = document.getElementById("play");
const rewindButton = document.getElementById("rewind");
const forwardButton = document.getElementById("forward");

// Set the container height according to video length
video.addEventListener('loadedmetadata', function() {
  const speed = 250; // Can be any number (adjust to your preference)
  container.style.height = (video.duration * speed) + 'px';
});

let isScrolling = false;

// Play video using scroll values and update counter
const playVideo = () => {
  // Get current scroll progress
  var scrollY = window.scrollY;
  // Get total page height and calculate percentage
  var height = document.documentElement.scrollHeight - window.innerHeight;
  var percentage = (scrollY / height) * 100;
  // Ensure percentage is valid
  if (!isNaN(percentage) && isFinite(percentage)) {
    // Set video playback position
    video.currentTime = video.duration * (percentage / 100);
    // Update counter
    updateCounter(percentage);
  }
  isScrolling = false;
};

// Update counter
const updateCounter = (percentage) => {
  counter.textContent = `${Math.floor(percentage)}%`;

  // Update counter background color (Synthwave colors)
  let colorValue = Math.floor(percentage * 2.55);
  counter.style.backgroundColor = `rgb(${colorValue}, 0, ${255 - colorValue})`;
};

// Throttle scroll events
window.addEventListener("scroll", () => {
  if (!isScrolling) {
    window.requestAnimationFrame(playVideo);
    isScrolling = true;
  }
});

// Handle touch events for mobile devices
document.addEventListener('touchstart', () => {
  isScrolling = false;
});

document.addEventListener('touchmove', () => {
  if (!isScrolling) {
    window.requestAnimationFrame(playVideo);
    isScrolling = true;
  }
}, { passive: false });

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
  video.currentTime -= 1; // Rewind by 5 seconds
  updateCounter((video.currentTime / video.duration) * 100);
});

// Fast forward video
forwardButton.addEventListener("click", () => {
  video.currentTime += 1; // Fast forward by 5 seconds
  updateCounter((video.currentTime / video.duration) * 100);
});

// Update counter while video plays
video.addEventListener('timeupdate', () => {
  updateCounter((video.currentTime / video.duration) * 100);
});
