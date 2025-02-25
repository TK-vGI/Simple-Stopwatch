const display = document.getElementById("timer");
const laps = document.getElementById("laps");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

// Start the stopwatch
let startBtn = document.getElementById("start");
startBtn.addEventListener("click", function() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update,10)
        isRunning = true;
    }
})

// Stop the stopwatch
let stopBtn = document.getElementById("stop");
stopBtn.addEventListener("click", function() {
    if (isRunning) {
        clearInterval(timer);
        timer = null;
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
})

// Reset the stopwatch
let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", function() {
    clearInterval(timer);
    timer = null;
    startTime = 0;
    elapsedTime = 0;
    display.textContent = `00:00:00`;
    laps.innerHTML = ""; // Clear lap times
    isRunning = false;
})

// Update the display with the elapsed time
function update() {
    display.textContent = calculateTime();
}

// Calculate and format the time
function calculateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}:${milliseconds}`;
}

//Adding function for listing laps
let lapBtn = document.getElementById("lap");
lapBtn.addEventListener("click", () => {
    if (isRunning) {
        const lapItem = document.createElement("li");
        lapItem.textContent = calculateTime();

        laps.appendChild(lapItem);
    }
})
