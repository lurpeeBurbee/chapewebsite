window.addEventListener("load", () => {
    const mapContainer = document.getElementById("mapContainer");
    const arrowContainer = document.getElementById("arrowContainer");
    const canvas = document.getElementById("arrowCanvas");
    const ctx = canvas.getContext("2d");

    // Variables to control arrow's movement and position
    let arrowX = 1600; // Initial horizontal position of the arrow (will be set to startLocation)
    const arrowSize = 0.5; // Scale factor for arrow size (adjustable)
    const arrowSpeed = 1.5; // Speed at which the arrow moves (adjustable)
    const startLocation = 1750; // Starting X position of the arrow (in pixels)
    const stopLocation = 2100; // Ending X position of the arrow (in pixels)

    let canvasWidth, canvasHeight;
    const arrowImg = new Image();
    arrowImg.src = "images/arrow.png"; // Load the arrow image

    let direction = 1; // 1 means moving right, -1 means moving left

    // Load the background image to get its actual dimensions
    const backgroundImg = new Image();
    backgroundImg.src = "images/mapview-railwaystation.jpg";
    backgroundImg.onload = function() {
        const backgroundWidth = backgroundImg.width;
        const backgroundHeight = backgroundImg.height;

        // Set canvas size to match the map container
        function resizeCanvas() {
            canvasWidth = mapContainer.offsetWidth;
            canvasHeight = mapContainer.offsetHeight;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            // Calculate the scaling factor
            const scaleX = canvasWidth / backgroundWidth;
            const scaleY = canvasHeight / backgroundHeight;
            const scale = Math.min(scaleX, scaleY);

            // Calculate the boundaries of the arrowContainer
            const containerLeft = arrowContainer.offsetLeft;
            const containerRight = containerLeft + arrowContainer.offsetWidth;

            // Adjust the arrow's start and stop locations relative to the background image size
            function getRelativePosition(pixelPosition) {
                return containerLeft + (pixelPosition * scale);
            }

            // Initialize arrowX to the startLocation
            arrowX = getRelativePosition(startLocation);

            // Draw the moving arrow
            function drawArrow() {
                ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear previous frame

                // Adjust the width and height of the arrow based on arrowSize
                const arrowWidth = arrowImg.width * arrowSize;
                const arrowHeight = arrowImg.height * arrowSize;

                // Draw the arrow at the current position, with adjusted size
                ctx.drawImage(arrowImg, arrowX - arrowWidth / 2, arrowContainer.offsetTop - arrowHeight / 2, arrowWidth, arrowHeight);
            }

            // Animation loop
            function animate() {
                arrowX += direction * arrowSpeed; // Move the arrow horizontally based on direction and speed

                // Reverse direction when the arrow reaches the boundaries of the arrowContainer
                if (arrowX >= getRelativePosition(stopLocation)) {
                    direction = -1; // Reverse direction when reaching the stopLocation
                } else if (arrowX <= getRelativePosition(startLocation)) {
                    direction = 1; // Reverse direction when reaching the startLocation
                }

                drawArrow();
                requestAnimationFrame(animate); // Continue the animation
            }

            // Ensure image is loaded before starting animation
            arrowImg.onload = function() {
                animate(); // Start animation after the image is loaded
            };
        }

        // Resize canvas when window is resized
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas(); // Initial canvas size
    };
});
