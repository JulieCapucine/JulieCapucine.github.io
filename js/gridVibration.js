//Canvas related
var widthScreen = document.documentElement.clientWidth + 30;
var heightScreen = document.documentElement.clientHeight + 10;

//mouse related
var mousePosition;

function MousePosition(_x, _y) {
  this.x = _x;
  this.y = _y;
}

function updatePosition(x, y) {
  mousePosition.x = x;
  mousePosition.y = y;
}

//Lines Related
var nbSeg = widthScreen/50, nbLineVert = heightScreen/40, nbLineHori = widthScreen/80;
var lineArray = [];
var lineActive = null;
var lineActiveOldData;
var standardStroke = 0.05;
var vibrationStrength = 1;
var capVibration = 10;

function Line(data, text, strokeWeight, index) {
  this.pointsArray = data;
  this.text = text;
  this.strokeWeight = strokeWeight;
  this.strokeColor = color(0,0,0);
  this.index = index;
  this.isHorizontal;
}

function LineArray(arrayVertical, arrayHorizontal) {
  this.verticalLines = arrayVertical;
  this.horizontalLines = arrayHorizontal;
}

//Test Related
var fadingParam = 0;
//var wordArray = ["creative", "poetry", "words", "travel", "experimentation", "learning", "curisosity"];
var wordArray = ["", ""];

function SetupText(string) {
  this.text = string;
  this.position = [random(0, widthScreen), random(0, heightScreen)];
  this.size = textSize(random(20, 40));
}

function setup() {
  canvas = createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
  canvas.parent('drawing-space');
  nbSeg = floor(nbSeg);
  nbLineVert = floor(nbLineVert);
  nbLineHori = floor(nbLineHori);
  //console.log("NB HORI" + nbLineHori);
  CreateLines(lineArray);
  DrawAllLines();
  mousePosition = new MousePosition(mouseX, mouseY);
}

function draw() {
  update();
}

function redrawLines(){
  background(255);
  DrawAllLines();
}

function CreateLine(nbSeg, horizontal, posFix, delta) {
  var line = new Array();
  for (i = 0; i < nbSeg; i ++) { 
    if (horizontal) {
      var x = i*((widthScreen + 10)/nbSeg);
      var y = (posFix) + (Math.random() * delta) - delta/2;
    } else {
      var x = (posFix) + (Math.random() * delta) - delta/2;;
      var y = i*((heightScreen + 10)/nbSeg)
    }    
      line[i] = [x, y];
  }
  return line;
  
}

function CreateLines(array) {
  lineArray = new LineArray(CreateLineArray(nbLineVert, false, widthScreen) , CreateLineArray(nbLineHori, true, heightScreen));
}

function CreateLineArray(IndexToUse, boolIsHorizontal, sizeToUse) {
  var _array = [];
  for (j = 0; j < IndexToUse; j ++ ) {
    var data = CreateLine(nbSeg, boolIsHorizontal, j*sizeToUse/IndexToUse, 50);
    //TODO Randomize text
    _array[j] = new Line (data, new SetupText(wordArray[Math.floor(Math.random() * wordArray.length)]), standardStroke, j);
    _array[j].isHorizontal = boolIsHorizontal;
   
  }
  return _array;
}

function DrawLine(arrayOfVertex, _strokeWeight, strokeColor) {
  noFill();
  stroke(strokeColor);
  strokeWeight(_strokeWeight);
  beginShape();
  for (i = 0; i < arrayOfVertex.length; i++) {
    vertex(arrayOfVertex[i][0],arrayOfVertex[i][1]);
  }
  endShape();
}

function DrawAllLines() {
  DrawAllLinesArray(lineArray.verticalLines);
  DrawAllLinesArray(lineArray.horizontalLines);
}

function DrawAllLinesArray(array) {
  for (j = 0; j < array.length; j++) {
    DrawLine(array[j].pointsArray, array[j].strokeWeight,array[j].strokeColor);
  }
}

function windowResized() {
  widthScreen = document.documentElement.clientWidth + 30;
  heightScreen = document.documentElement.clientHeight + 10;
  nbSeg = widthScreen/50, nbLineVert = heightScreen/40, nbLineHori = widthScreen/80;
  lineArray = [];
  lineActive = null;
  lineActiveOldData;
  standardStroke = 0.05;
  vibrationStrength = 1;
  capVibration = 10;
  setup();
 // resizeCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
 // createLinesVertical(arrayLineVertical);
 // createLinesHorizontal(arrayLineHorizontal);
 // redraw();
}

function update(){
  if (IsMovingHorizontally()) {
    var nHori = round(mouseY*nbLineHori/heightScreen);
    if (nHori >= nbLineHori) {
      nHori = nbLineHori - 1;
    }
    Boldify(nHori, true);
    Vibrate(true, vibrationStrength);
  } else { 
    var nVert = round(mouseX*nbLineVert/widthScreen);
    Boldify(nVert, false);
  }
  if (vibrationStrength <= capVibration )
    vibrationStrength += 0.5;
  updatePosition(mouseX, mouseY);
  redrawLines();
  DrawText();
}

function DrawText() {
  if (lineActive != null) {
    textSize(lineActive.text.size);
    fill(0, 0, 0, fadingParam);
    noStroke();
    text(lineActive.text.text, lineActive.text.position[0], lineActive.text.position[1]) ;
    if (fadingParam < 255 )
      fadingParam ++;
  }
}

function IsMovingHorizontally() {
  var vectorPositionX = abs(mouseX - mousePosition.x);
  var vectorPositionY = abs(mouseY - mousePosition.y);
  //return vectorPositionX > vectorPositionY;
  return true;
}

function Boldify(index, isHorizontal) {
  if (lineActive != null && lineActive.index != index) {
   ResetLine();
  } 
  
  if (isHorizontal) {
      lineArray.horizontalLines[index].strokeWeight = 1;
      lineArray.horizontalLines[index].strokeColor = color(200,200,200);
      lineActive = lineArray.horizontalLines[index];
  } else {
      lineArray.verticalLines[index].strokeWeight = 1;
      lineArray.verticalLines[index].strokeColor = color(200,200,200);
      lineActive = lineArray.verticalLines[index];
  }
  //edgecase = same index for horizontal and vertical
}

function ResetLine() {
      vibrationStrength = 1;
      if (lineActive.isHorizontal){
        lineArray.horizontalLines[lineActive.index].strokeWeight = standardStroke;
        var data = CreateLine(nbSeg, true, lineActive.index * heightScreen / nbLineHori, 50);
        lineArray.horizontalLines[lineActive.index] = new Line (data, new SetupText(wordArray[Math.floor(Math.random() * wordArray.length)]), standardStroke, lineActive.index);
        lineArray.horizontalLines[lineActive.index].isHorizontal = true;
        //console.log(lineArray.horizontalLines[lineActive.index]);
      } else {
        lineArray.verticalLines[lineActive.index].strokeWeight = standardStroke;
        var data = CreateLine(nbSeg, false, lineActive.index * widthScreen / nbLineVert, 50);
        lineArray.horizontalLines[lineActive.index] = new Line (data, new SetupText(wordArray[Math.floor(Math.random() * wordArray.length)]), standardStroke, lineActive.index);
        lineArray.horizontalLines[lineActive.index].isHorizontal = false;
        //console.log(lineArray.horizontalLines[lineActive.index]);
      }
}



function Vibrate(isHorizontal, vibrationStrength) {
  //will vibrate the active line
  if (lineActive != null) { 
      for (k=0; k < lineActive.pointsArray.length; k++) {
        if (isHorizontal) {
          lineActive.pointsArray[k][1] += random(-vibrationStrength, vibrationStrength);
        } else {
           lineActive.pointsArray[k][0] += random(-vibrationStrength, vibrationStrength);
        }
      }

  }
}

   