let img;
let maskLayer;

function preload() {
  img = loadImage('MAREA/otherMon.png');
}

function setup() {
  const container = select('#autreCam');

  if (!container) {
    return;
  }

  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('#autreCam');
  cnv.addClass('canvaCam');
  cnv.position(windowWidth/2 - cnv.width/2, windowHeight/2 - cnv.height/2)

  maskLayer = createGraphics(width, height);
}

function draw() {
  if (!img || !img.width || !maskLayer) {
    return;
  }

  background(0);

  maskLayer.clear();
  maskLayer.circle(mouseX, mouseY, 400);

  const imgAspect = img.width / img.height;
  const canvasAspect = width / height;

  let drawW = width;
  let drawH = height;

  if (imgAspect > canvasAspect) {
    drawW = width;
    drawH = width / imgAspect;
  } else {
    drawH = height;
    drawW = height * imgAspect;
  }

  const drawX = (width - drawW) / 2;
  const drawY = (height - drawH) / 2;

  const newImg = img.get();
  newImg.mask(maskLayer);
  image(newImg, drawX, drawY, drawW, drawH);
}

function windowResized() {
  const container = select('#autreCam');

  if (!container) {
    return;
  }

  resizeCanvas(container.elt.offsetWidth, container.elt.offsetHeight);
  maskLayer = createGraphics(width, height);
}
