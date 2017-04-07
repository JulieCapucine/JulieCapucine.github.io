var canvas;
var logo; 

class TrianglePoints{
	constructor(x1, x2, x3, y1, y2, y3) {
    this.x1 = x1;
    this.x2 = x2;
    this.x3 = x3;
    this.y1 = y1;
    this.y2 = y2;
    this.y3 = y3;
  }

  translateX(transX) {
    this.x1 += transX;
    this.x2 += transX;
    this.x3 += transX;
  }

  translateY(transY) {
    this.y1 += transY;
    this.y2 += transY;
    this.y3 += transY;
  }
}

var bigTriangles = new Array(300);
var smallTriangles = new Array(300);
var totalColoredTriangle = 200;
var coloredTriangle = 0;
var mvt = 60;
var nbMvt = 20;
var rayon = 50;

function fillTrianglesArray(tailleInf,tailleMax, array) {
	for (var i = 0; i < array.length; i++) {
		var x1 = random(0,width);
        var x2 = random(0,width);
        var x3 = random(0,width);
       
        var y1 = random(0,height);
        var y2 = random(0,height);
        var y3 = random(0,height);

       	while (((abs(x1-x2))>tailleMax) ||((abs(x2-x3))>tailleMax) || ((abs(x3-x1))>tailleMax) && ((abs(x1-x2))<tailleInf) ||((abs(x2-x3))<tailleInf) || ((abs(x3-x1))<tailleInf)){
            x1 = random(0,width);
            x2 = random(0,width);
            x3 = random(0,width);
        }
          
        while (((abs(y1-y2))>tailleMax) ||((abs(y2-y3))>tailleMax) || ((abs(y3-y1))>tailleMax) && ((abs(y1-y2))<tailleInf) ||((abs(y2-y3))<tailleInf) || ((abs(y3-y1))<tailleInf)){
            y1 =  random(0,height);
            y2 = random(0,height);
            y3 =  random(0,height);
           
        }
        array[i] = new TrianglePoints(x1,x2,x3,y1,y2,y3);
	}
}

function setup() {
   canvas = createCanvas(document.documentElement.clientWidth - 25, document.documentElement.clientHeight);
   canvas.parent("mySketch");
   /*logo = loadImage("logonoir.png");*/
   noLoop();
   fillTrianglesArray(20, 25, bigTriangles);
   fillTrianglesArray(0, 10, smallTriangles);
   
}

function draw() {
	background(255);
	
	for (var i = 0; i < bigTriangles.length; i++) {
		
        drawTriangle(bigTriangles[i]);
	}

	for (var i = 0; i < smallTriangles.length; i++) {
        drawTriangle(smallTriangles[i]);
	}
	
	

}

function mouseMoved(){
	for (var i = 0; i < smallTriangles.length; i++) {
        if (abs(smallTriangles[i].x1 - mouseX) < rayon){
        	if(abs(smallTriangles[i].y1 - mouseY) < rayon) {
        	  smallTriangles[i].translateX(random(-mvt,mvt));
       			smallTriangles[i].translateY(random(-mvt,mvt));
       			drawTriangle(smallTriangles[i]);
        	}
        	
        }
	}	
}

function windowResized() {
  resizeCanvas(document.documentElement.clientWidth - 25, document.documentElement.clientHeight);
  fillTrianglesArray(20, 25, bigTriangles);
  fillTrianglesArray(0, 10, smallTriangles);
  coloredTriangle = 0;
  redraw();
}

function drawTriangle(triangleToDraw) {

    if (coloredTriangle < totalColoredTriangle) {
        var colorR = random(0, 1);
        var colorV = random(0, 1);
        var colorB = random(0, 200);

        stroke(colorR, colorV, colorB);
        fill(colorR, colorV, colorB);
        coloredTriangle ++;   
    } else {
        stroke(0, 0, 0);
        fill(0,0,0);
    }
    triangle(triangleToDraw.x1, triangleToDraw.y1, triangleToDraw.x2, triangleToDraw.y2, triangleToDraw.x3, triangleToDraw.y3);

}
