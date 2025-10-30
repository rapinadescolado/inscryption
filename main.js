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
const counter = document.getElementById("counter");
const positivePoint = document.getElementById("positive-point-button");
const negativePoint = document.getElementById("negative-point-button");
var score = 0;
var currentPlayer = 1
    
function reloadCounter() {

    // Delete all the points
    let points = 0;
    while (counter.firstChild) {
        counter.removeChild(counter.firstChild);
    }
    // Check the counter orientation
    if (score < 0) {
        points = score * -1;
        counter.style.transform = "rotate(180deg)";
    } else if (score > 0) {
        points = score;
        counter.style.transform = "rotate(0deg)";
    }
    // Add the points
    for (let i = 0; i < points; i++) {
        let element = document.createElement("div");
        element.classList.add("counter-point");
        counter.appendChild(element);
    }
    
}
function setScore(newScore) {
    score = newScore;
    reloadCounter();
}

// Positive and Negative Points
positivePoint.addEventListener("click", (event) => {
    setScore(score + 1);
})
negativePoint.addEventListener("click", (event) => {
    setScore(score - 1);
})