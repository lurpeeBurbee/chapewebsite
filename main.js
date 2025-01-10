// Get video element and controls
const video = document.getElementById("myVideo");
const container = document.getElementById("videoContainer");
const counter = document.getElementById("counter");
const playButton = document.getElementById("play");
const rewindButton = document.getElementById("rewind");
const forwardButton = document.getElementById("forward");

// Set the container height according to video length
video.addEventListener('loadedmetadata', function () {
  const speed = 250; // Can be any number (adjust to your preference)
  container.style.height = (video.duration * speed) + 'px';
});

let isScrolling = false;

// Play video using scroll values and update counter
const playVideo = () => {
  const scrollY = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;

  // Ensure percentage calculation is accurate
  let percentage = (scrollY / height) * 100;

  // Force percentage to 100 when scrolled to the bottom
  if (scrollY + window.innerHeight >= document.documentElement.scrollHeight -1) {
    percentage = 100;

  }

  if (!isNaN(percentage) && isFinite(percentage)) {
    video.currentTime = video.duration * (percentage / 100);
    updateCounter(percentage);
  }

  isScrolling = false;
};


const updateCounter = (percentage) => {
  const displayPercentage = Math.min(100, Math.floor(percentage)); // Limit to 100%

  // Update percentage text
  counter.textContent = `${displayPercentage}%`;

  // Update counter background color
  let colorValue = Math.floor(displayPercentage * 2.55);
  counter.style.backgroundColor = `rgb(${colorValue}, 0, ${255 - colorValue})`;

  // Update progress bar width and color gradient
  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${displayPercentage}%`;
  progressBar.style.background = `linear-gradient(to right, rgb(${colorValue}, 0, ${255 - colorValue}), rgb(${colorValue - 20}, 0, ${255 - colorValue + 20}))`;
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
