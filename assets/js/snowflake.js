// Function to generate random snowflakes
function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 100; // Total number of snowflakes

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // Randomly size the snowflakes
        const size = Math.random() * 5 + 5; // Snowflakes between 5px to 10px
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;

        // Randomly position the snowflakes horizontally
        const left = Math.random() * window.innerWidth;
        snowflake.style.left = `${left}px`;

        // Random animation duration for each snowflake
        const duration = Math.random() * 3 + 3; // Snowflakes fall between 3 to 6 seconds
        snowflake.style.animationDuration = `${duration}s`;

        // Randomly delay each snowflake's animation
        const delay = Math.random() * 5; // Delay between 0 and 5 seconds
        snowflake.style.animationDelay = `${delay}s`;

        // Add snowflake to the container
        snowContainer.appendChild(snowflake);
    }
}

// Initialize the snowflakes when the page loads
window.onload = createSnowflakes;
