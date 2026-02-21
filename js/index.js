

let img = [];
let currentIndex = 0;

let lastX, lastY;
let moveThreshold = 100;
let accumulatedDistance = 0;

function preload() {
    img[0]=loadImage("img/Eating1.jpeg")
    img[1]=loadImage("img/Eating2.jpeg")
    img[2]=loadImage("img/Eating3.jpeg")
    img[3]=loadImage("img/Eating4.jpeg")
    img[4]=loadImage("img/Eating5.jpeg")
    img[5]=loadImage("img/Eating6.jpeg")
    img[6]=loadImage("img/Eating7.jpeg")
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

const radius = 200;
const step = 360 / words.length;

let wordElements = [];

words.forEach((word, i) => {
  const div = document.createElement("div");
  div.textContent = word;
  div.style.position = "absolute";
  div.style.width = "100%";
  div.style.textAlign = "left";
  div.style.left = "0";
  div.style.paddingLeft = "40%";
  div.style.fontSize = "60px";
  div.style.transform = `
    rotateX(${i * step}deg)
    translateZ(${radius}px)
  `;
  wheel.appendChild(div);
  wordElements.push(div);
});

let angle = 0;

function animate() {
  angle -= 0.65;

  // THIS is what makes it revolve
  wheel.style.transform = `rotateX(${angle}deg)`;

  wordElements.forEach((el, i) => {
    let currentAngle = (i * step + angle) % 360;
    if (currentAngle < 0) currentAngle += 360;

    // distance from upright (0° or 360°)
    let distanceFromFront = Math.min(
      Math.abs(currentAngle),
      Math.abs(currentAngle - 360)
    );

    let clarity = 1 - (distanceFromFront / 180);

    el.style.opacity = clarity;
    el.style.filter = `blur(${(1 - clarity) * 6}px)`;
  });

  requestAnimationFrame(animate);
}

animate();


function draw() {
 

  trackMouseDistance();
  displayImage();

}

function trackMouseDistance() {
  let d = dist(mouseX, mouseY, lastX, lastY);
  accumulatedDistance += d;

  if (accumulatedDistance > moveThreshold) {
    currentIndex++;

    if (currentIndex >= img.length) {
      currentIndex = 0;
    }

    accumulatedDistance = 0;
  }

  lastX = mouseX;
  lastY = mouseY;
}


function displayImage() {
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


