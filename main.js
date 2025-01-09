// Get video element
const video = document.getElementById("myVideo");
const container = document.getElementById("videoContainer");
const counter = document.getElementById("counter");

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
    counter.textContent = `${Math.floor(percentage)}%`;
    
    // Update counter background color (Synthwave colors)
    let colorValue = Math.floor(percentage * 2.55);
    counter.style.backgroundColor = `rgb(${colorValue}, 0, ${255 - colorValue})`;
  }
  isScrolling = false;
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
