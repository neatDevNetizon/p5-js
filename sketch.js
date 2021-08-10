
var QUOTES = ["text","array"] //array of texts

var img3;
var particles = []; // in this case, each particle is text which is contained in QUOTES
var font 

function preload() {
  img3 = loadImage('./3.jpg');
  font = loadFont('./font.otf');
}

function setup() {
  createCanvas(800,800);
  pixelDensity(1); //
  img3.resize(800, 800);
  
    points = font.textToPoints(
    'EOPS', 0, 0, 500, {
      sampleFactor: 1,
      simplifyThreshold: 0
    });
  
  for (var i = 0; i < 10;i++) {
    particles[i] = new Particle(random(800), random(800))
  }  //this allows mutiple texts to appear at the same time. 
}

function draw() {

  push();
  fill(0)
  translate(200,600)
    for (let i = 0; i < points.length; i++) {
    let p = points[i];
    ellipse(p.x , 
      p.y , 5, 5);
  }
  pop();
  
  
  img3.loadPixels(); //this turns img3 into pixel
  
  for (var i = 0; i < 10; i++) { //this loop is required after the loop command in set-up. 
    particles[i].update(); //it updates particles with value i
    particles[i].show();  //this allows particles to show
  }
  

}  

function Particle(x, y) {
  this.x = x;
  this.y = y;

  this.update = function() {
    this.x = random(-20, 800);
    this.y = random(-20, 800); // -20 makes it easier to fill the left side of the canvas
  }

  this.show = function() {
    noStroke();

    var col = img3.get(this.x > 0 ? this.x : 0, this.y); //this line is for getting color data of image at the given position.
    
    //if this.x is lower than 0, we get color of img3 at the position (0, this.y)
    // this.x is bigger than 0, we just get color of img3 at the position of (this.x, this.y)
    //this.x > 0 ? this.x : 0 is same as if (this.x > 0) return this.x else return 0 (a very useful code line!!!!!)
    fill(col[0], col[1], col[2], 200); //filling depending on which area the texts poping out
    textSize(12) 
    text(random(QUOTES), this.x, this.y); //let the texts to randomly generated on canvas
    
  }
}