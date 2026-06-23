let imgSrcs = [
  'MAREA/ABOUT/VIDEO1/1.jpg',
  'MAREA/ABOUT/VIDEO1/2.jpg',
  'MAREA/ABOUT/VIDEO1/3.jpg',
  'MAREA/ABOUT/VIDEO1/4.jpg',
  'MAREA/ABOUT/VIDEO1/5.jpg',
  'MAREA/ABOUT/VIDEO1/6.jpg',
  'MAREA/ABOUT/VIDEO1/7.jpg',
  'MAREA/ABOUT/VIDEO1/8.jpg',
  'MAREA/ABOUT/VIDEO2/1.jpg',
  'MAREA/ABOUT/VIDEO2/2.jpg',
  'MAREA/ABOUT/VIDEO2/3.jpg',
  'MAREA/ABOUT/VIDEO2/4.jpg',
  'MAREA/ABOUT/VIDEO3/1.jpg',
  'MAREA/ABOUT/VIDEO3/2.jpg',
  'MAREA/ABOUT/VIDEO3/3.jpg',
  'MAREA/ABOUT/VIDEO3/4.jpg',
  'MAREA/ABOUT/VIDEO3/5.jpg'
];
let distTreshold = 100;
let scaleFactor = 5;

//variables
let images = [];
let queue = [];
let lastMousePos = { x: 0, y:0 };
let imgIndex = 0;

let img;

function preload() {
  for (let i = 0; i < imageSrcs.length; i++){
    images[i] = loadImage(imageSrcs[i]);
  }
}

function setup() {
  const container = select('#about');

  if (!container) {
    return;
  }

  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('about');
  cnv.addClass('canvaAbout');
  cnv.style("display", "block");
  cnv.style("position", "absolute");
  cnv.style("inset", "0");
  cnv.style("z-index", "-1");
  lastMousePos = { x: mouseX, y: mouseY };
}

function draw() {
  clear();
  background('#7a93b8');

  let d = dist(mouseX, mouseY, lastMousePos.x, lastMousePos.y);

  if (d > distTreshold) {
    queue.unshift({ x: mouseX, y: mouseY, index: imgIndex });
    lastMousePos = { x: mouseX, y: mouseY };
    imgIndex = (imgIndex + 1) % images.length;
  }

  if (queue.length > images.length){
    queue.pop();
  }

  let scale = width / scaleFactor;

  for (let i = queue.length - 1; i >= 0; i--) {
    let img = images[queue[i].index];
    if (img) {
      let imgWidth = (img.width * scale) / img.width;
      let imgHeight = (img.height * scale) / img.width;

      image(
        img,
        queue[i].x - imgWidth / 2,
        queue[i].y - imgHeight / 2,
        imgWidth,
        imgHeight
      );
    }
  }
}

function windowResized() {
  const container = select('#about');

  if (!container) {
    return;
  }

  resizeCanvas(container.elt.offsetWidth, container.elt.offsetHeight);
  maskLayer = createGraphics(width, height);
}
