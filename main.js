// ORIENTATION CHECK
const userAgent = navigator.userAgent;
var device;
var aspectRatio;
var deviceOrientation;
const orientationCheckScreen = document.getElementById("orientation-check-screen");
const orientationCheckText = document.getElementById("orientation-check-text");

if (/Mobi|Android/i.test(userAgent)) {
  device = "Mobile";
} else if (/Tablet|iPad/i.test(userAgent)) {
  device = "Tablet";
} else {
  device = "Desktop";
}

function orientationCheck() {
    setTimeout(() => {

        // Detect orientation
        aspectRatio = window.innerWidth / window.innerHeight;
        if (aspectRatio >= 1) {
            deviceOrientation = "Landscape";
        } else {
            deviceOrientation = "Portrait";
        }
        // Apply result
        if (device == "Desktop" && deviceOrientation == "Landscape") {
            orientationCheckScreen.style.display = "flex";
            orientationCheckText.innerHTML = "Esse site está apenas disponível para celulares.";
        } else if (device  == "Desktop" && deviceOrientation == "Portrait") {
            orientationCheckScreen.style.display = "flex";
            orientationCheckText.innerHTML = `
            Esse site está apenas disponível para celulares.<br>
            (pq seu pc ta de pé?...)
            `;
        } else if (device == "Mobile" && deviceOrientation == "Landscape") {
            orientationCheckScreen.style.display = "flex";
            orientationCheckText.innerHTML = "Por favor, deixe seu celular de pé.";
        } else if (device == "Mobile" && deviceOrientation == "Portrait") {
            orientationCheckScreen.style.display = "none";
        }
        
    }, 100);
}
setTimeout(() => {
    orientationCheck()
    window.addEventListener("orientationchange", orientationCheck);
}, 100);





// COUNTER CODE
const pointsCounter = document.getElementById("counter");
const positivePoint = document.getElementById("positive-point-button");
const negativePoint = document.getElementById("negative-point-button");
var score = 0;
var winner = 1;
    
function reloadCounter() {

    // Delete all the points
    let points = 0;
    while (pointsCounter.firstChild) {
        pointsCounter.removeChild(pointsCounter.firstChild);
    }
    // Check the counter orientation
    if (score < 0) {
        points = score * -1;
        pointsCounter.style.transform = "rotate(180deg)";
    } else if (score > 0) {
        points = score;
        pointsCounter.style.transform = "rotate(0deg)";
    }
    // Add the points
    for (let i = 0; i < points; i++) {
        let element = document.createElement("div");
        element.classList.add("counter-point");
        if (winner > 0) {
            element.classList.add("golden");
        } else {
            element.classList.add("red");
        }
        pointsCounter.appendChild(element);
    }
    
}
function setScore(newScore) {
    let sound = new Audio("assets/audio/point.mp3")
    sound.volume = 0.6;
    sound.play();
    score = newScore;
    checkWinner();
    reloadCounter();
}
function checkWinner() {
    if (score > 0) {
        winner = 1;
    } else if (score < 0) {
        winner = -1;
    }
    if (score == 10 || score == -10) {
        finishGame();
    }
}

// Positive and Negative Points
positivePoint.addEventListener("click", (event) => {
    setScore(score + 1);
});
negativePoint.addEventListener("click", (event) => {
    setScore(score - 1);
});





// BELLRING AND ROUNDS CODE
const bellRing = document.getElementById("bellring");
const roundCounter = document.getElementById("rounds");
var bellRingCooldown = null;
var currentRound = 0;
var currentPlayer = -1; // 1 = Dourado / -1 = Bordô
var seconds = 0;
var minutes = 0;

function passTheTurn() {

    // Sound and animation
    bellRing.classList.add("clicked");
    setTimeout(() => {
        bellRing.classList.remove("clicked");
    }, 50);
    let ringSound = new Audio("assets/audio/ring.mp3").play();

    // Cooldown check
    if (bellRingCooldown) {
        // Timeout
        clearTimeout(bellRingCooldown);
        bellRingCooldown = setTimeout(() => {
            bellRingCooldown = null;
        }, 2000);
        return "on Cooldown!"
    }
    bellRingCooldown = setTimeout(() => {
        bellRingCooldown = null;
    }, 2000);

    // Pass the Turn
    currentRound++;
    roundCounter.innerHTML = `${currentRound}`;
    // Toggle the current player
    currentPlayer = currentPlayer * -1;

    // Start the timer if is the first round
    if (currentRound == 1) {
        startGame();
    }

}

bellRing.addEventListener("click",(event) => {
    passTheTurn();
});





// GAME STATS, FUNCTIONS AND TIMER
const gameOverScreen = document.getElementById("gameover-screen");
const winnerText = document.getElementById("winner");
const gameTimeText = document.getElementById("gametime");

function startGame() {
    gameTimeLoop = setInterval(() => {
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes == 60) {
            finishGame();
        }
    }, 1000);
}

function finishGame() {
    // Show the gameover screen
    gameOverScreen.style.display = "flex";

    // Winner and game time
    if (winner == 1) {
        winnerText.innerHTML = "DOURADO";
        winnerText.classList.add("dourado");
    } else {
        winnerText.innerHTML = "BORDÔ";
        winnerText.classList.add("bordo");
    }
    if (minutes > 0) {
        gameTimeText.innerHTML = `O jogo durou ${minutes} minutos e ${seconds} segundos.`;
    } else {
        gameTimeText.innerHTML = `O jogo durou ${seconds} segundos.`;
    }

    // BellRing animation
    bellRing.classList.add("finish");
}