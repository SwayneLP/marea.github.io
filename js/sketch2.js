const imagePaths = [
  'MAREA/ABOUT/VIDEO1/1.jpg',
  'MAREA/ABOUT/VIDEO1/2.jpg',
  'MAREA/ABOUT/VIDEO1/3.jpg',
  'MAREA/ABOUT/VIDEO1/4.jpg',
  'MAREA/ABOUT/VIDEO1/5.jpg',
  'MAREA/ABOUT/VIDEO1/6.jpg',
  'MAREA/ABOUT/VIDEO1/7.jpg',
  'MAREA/ABOUT/VIDEO1/8.jpg',
  'MAREA/ABOUT/VIDEO2/1.JPG',
  'MAREA/ABOUT/VIDEO2/2.jpg',
  'MAREA/ABOUT/VIDEO2/3.jpg',
  'MAREA/ABOUT/VIDEO2/4.jpg',
  'MAREA/ABOUT/VIDEO3/1.jpg',
  'MAREA/ABOUT/VIDEO3/2.jpg',
  'MAREA/ABOUT/VIDEO3/3.jpg',
  'MAREA/ABOUT/VIDEO3/4.jpg',
  'MAREA/ABOUT/VIDEO3/5.jpg'
];

let images = [];
let currentImageIndex = 0;
let lastSwapTime = 0;
let lastMouseX = 0;
let lastMouseY = 0;
const minSwapInterval = 80;
const maxSwapInterval = 8000;
const maxCursorWidth = 500;
const maxCursorHeight = 500;

function preload() {
  images = imagePaths.map((path) => loadImage(path));
}

function setup() {
  const container = select('#about');

  if (!container) {
    return;
  }

  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('about');
  cnv.addClass('canvaAbout');
  cnv.style('display', 'block');
  cnv.style('position', 'absolute');
  cnv.style('inset', '0');
  cnv.style('z-index', '0');

  noCursor();
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function draw() {
  background('#7a93b8');

  if (!images.length) {
    return;
  }

  const mouseSpeed = dist(mouseX, mouseY, lastMouseX, lastMouseY);
  const speedFactor = constrain(mouseSpeed, 0, 18);
  const swapInterval = map(speedFactor, 0, 18, maxSwapInterval, minSwapInterval);

  if (millis() - lastSwapTime > swapInterval) {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lastSwapTime = millis();
  }

  const img = images[currentImageIndex];

  if (!img || !img.width) {
    return;
  }

  const imgAspect = img.width / img.height;
  let drawW = maxCursorWidth;
  let drawH = drawW / imgAspect;

  if (drawH > maxCursorHeight) {
    drawH = maxCursorHeight;
    drawW = drawH * imgAspect;
  }

  const x = mouseX - drawW / 2;
  const y = mouseY - drawH / 2;

  image(img, x, y, drawW, drawH);

  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
