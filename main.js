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



