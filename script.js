document.addEventListener("DOMContentLoaded", function () {
    const dynamicText = document.querySelector(".loop");

    const messages = [
        "BUDGET?",
        "HUNGRY?",
        "CRAVING?"
    ];

    let index = 0;

    function updateText() {
        dynamicText.style.opacity = 0; // Fade out

        setTimeout(() => {
            dynamicText.textContent = messages[index];
            dynamicText.style.opacity = 1; // Fade in
            index = (index + 1) % messages.length;
        }, 500); // Delay for smooth fade effect
    }

    setInterval(updateText, 4000); // Changes text every 2 seconds
});
