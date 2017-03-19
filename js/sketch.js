var canvas;
var triangles = new Array(100);
var logo; 

function setup() {
  canvas = createCanvas(document.documentElement.clientWidth - 25, document.documentElement.clientHeight);
  canvas.parent("mySketch");
  logo = loadImage("img/logonoir.png");
  background(255);
  noLoop();
}

function draw() {
	image(logo, (document.documentElement.clientWidth - 25) /2, 0);
	var i = 0;
      triangleB(1000, i, 0, 10);
      triangleB(200, i, 20,30);
      triangleB(50, i, 20, 60);
 /*     
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);*/
}

function triangleB(nbTri,depassement,tailleInf,tailleMax){
   
      var totalColoredTriangle = (0.3*nbTri);
      var coloredTriangle = 0;
     
     
     for (var i=0; i<=nbTri; i++) {
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
              triangle(x1, y1, x2, y2, x3, y3);
              
          
     
      }
}
