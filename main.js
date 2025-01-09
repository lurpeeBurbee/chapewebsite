// Get video element
const video = document.getElementById("myVideo");
const container = document.getElementById("videoContainer");

// Set the container height according to video length
video.addEventListener('loadedmetadata', function() {
  const speed = 250; // Can be any number (adjust to your preference)
  container.style.height = (video.duration * speed) + 'px';
});

let isScrolling = false;

// Play video using scroll values
const playVideo = () => {
  // Get current scroll progress
  var scrollY = window.scrollY;
  // Get total page height and calculate percentage
  var height = document.documentElement.scrollHeight - window.innerHeight;
  var percentage = (scrollY / height);
  // Set video playback position
  video.currentTime = video.duration * percentage;
  isScrolling = false;
};

// Throttle scroll events
window.addEventListener("scroll", () => {
  if (!isScrolling) {
    window.requestAnimationFrame(playVideo);
    isScrolling = true;
  }
});



// // get video element
// const video = document.getElementById("myVideo");
// const container = document.getElementById("videoContainer");

// // set the container height according to video length
// video.addEventListener('loadedmetadata', function() {
//   const speed = 250; // can be any number (adjust to your preference)
//   container.style.height = (video.duration * speed) + 'px';
// });

// // play video using scroll values
// // function is attached to scroll event.

// const playVideo = () => {
//   // get current scroll progress
//   var scrollY = window.scrollY;
//   // get total page height and calculate percentage
//   var height = document.documentElement.scrollHeight - window.innerHeight;
//   var percentage = (scrollY / height);
//   // set video playback position.
//   video.currentTime = video.duration * percentage;
//   window.requestAnimationFrame(playVideo);
// };

// window.addEventListener("scroll", playVideo);
