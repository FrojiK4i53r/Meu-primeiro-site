const gameArea = document.getElementById("game-area");
const target = document.getElementById("target");

let startTime = 0;
let attempts = 0;
let bestTime = null;


function randomPosition() {
    const areaRect = gameArea.getBoundingClientRect();
    const size = 60;

    const x = Math.random() * (areaRect.width - size);
    const y = Math.random() * (areaRect.height - size);

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}


function showTarget() {
    setTimeout(() => {
        randomPosition();
        target.style.display = "block";
        startTime = performance.now();
    }, Math.random() * 1500 + 300); 
}

target.addEventListener("click", () => {
    const reaction = Math.floor(performance.now() - startTime);

    attempts++;
    document.getElementById("reaction-time").textContent = reaction;
    document.getElementById("attempts").textContent = attempts;

    if (bestTime === null || reaction < bestTime) {
        bestTime = reaction;
        document.getElementById("best-time").textContent = bestTime;
    }

    target.style.display = "none";
    showTarget();
});


document.getElementById("start-btn").addEventListener("click", () => {
    attempts = 0;
    bestTime = null;

    document.getElementById("reaction-time").textContent = "--";
    document.getElementById("best-time").textContent = "--";
    document.getElementById("attempts").textContent = 0;

    target.style.display = "none";
    showTarget();
});

showTarget();

