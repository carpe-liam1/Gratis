let img = [];
let currentIndex = 0;
let lastX, lastY;
let moveThreshold = 100;
let accumulatedDistance = 0;

// NEW: Control variables for rotation speed
let rotationSpeed = -0.55;
const slowSpeed = -0.05;
const fastSpeed = -0.55;

function preload() {
    img[0] = loadImage("img/Eating1.jpeg");
    img[1] = loadImage("img/Eating2.jpeg");
    img[2] = loadImage("img/Eating3.jpeg");
    img[3] = loadImage("img/Eating4.jpeg");
    img[4] = loadImage("img/Eating5.jpeg");
    img[5] = loadImage("img/Eating6.jpeg");
    img[6] = loadImage("img/Eating7.jpeg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    background(0);
    lastX = mouseX;
    lastY = mouseY;
}

const words = ["Draw", "Write", "Photograph", "Sculpt", "Design"];
const wheel = document.getElementById("wheel");
const MY_LINK_URL = "https://forms.gle/kF95tbmVTTL5ijti7";

const radius = 200;
const step = 360 / words.length;
let wordElements = [];
let angle = 0;

// Create the rotating links
words.forEach((word, i) => {
    const link = document.createElement("a");
    link.href = MY_LINK_URL;
    link.target = "_blank"; // Opens in new tab
    link.textContent = word;
    
    // Style the link
    link.style.position = "absolute";
    link.style.width = "100%";
    link.style.textAlign = "left";
    link.style.left = "0";
    link.style.paddingLeft = "40%";
    link.style.fontSize = "60px";
    link.style.textDecoration = "none";
    link.style.color = "black";
    link.style.transition = "color 0.3s ease"; // Smooth color transition
    
    // Position in 3D space
    link.style.transform = `
      rotateX(${i * step}deg)
      translateZ(${radius}px)
    `;

    // Hover effect for specific word color
    link.onmouseover = () => link.style.color = "white";
    link.onmouseout = () => link.style.color = "black";

    wheel.appendChild(link);
    wordElements.push(link);
});

// Event listeners to slow down the wheel rotation
wheel.addEventListener("mouseenter", () => { rotationSpeed = slowSpeed; });
wheel.addEventListener("mouseleave", () => { rotationSpeed = fastSpeed; });

function animate() {
    angle += rotationSpeed;
    wheel.style.transform = `rotateX(${angle}deg)`;

    wordElements.forEach((el, i) => {
        let currentAngle = (i * step + angle) % 360;
        if (currentAngle < 0) currentAngle += 360;

        let distanceFromFront = Math.min(
            Math.abs(currentAngle),
            Math.abs(currentAngle - 360)
        );

        let clarity = 1 - (distanceFromFront / 180);
        el.style.opacity = clarity;
        el.style.filter = `blur(${(1 - clarity) * 6}px)`;
        
        // Disable clicking on links that are "behind" the wheel
        el.style.pointerEvents = clarity > 0.7 ? "auto" : "none";
    });

    requestAnimationFrame(animate);
}

animate();

function draw() {
    // Clear canvas slightly for a trail effect or full clear
    background(0); 
    trackMouseDistance();
    displayImage();
}

function trackMouseDistance() {
    let d = dist(mouseX, mouseY, lastX, lastY);
    accumulatedDistance += d;

    if (accumulatedDistance > moveThreshold) {
        currentIndex++;
        if (currentIndex >= img.length) currentIndex = 0;
        accumulatedDistance = 0;
    }

    lastX = mouseX;
    lastY = mouseY;
}

function displayImage() {
    if (img[currentIndex]) {
        let currentImg = img[currentIndex];
        let imgRatio = currentImg.width / currentImg.height;
        let canvasRatio = width / height;

        let drawWidth, drawHeight;
        if (imgRatio > canvasRatio) {
            drawWidth = width * 0.6;
            drawHeight = drawWidth / imgRatio;
        } else {
            drawHeight = height * 0.5;
            drawWidth = drawHeight * imgRatio;
        }

        image(currentImg, mouseX, mouseY, drawWidth, drawHeight);
    }
}