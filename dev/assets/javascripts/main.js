// http://www.kirupa.com/html5/animating_many_things_on_a_canvas.htm

// http://code.tutsplus.com/tutorials/how-to-generate-noise-with-canvas--net-16556
function Circle(radius, speed, width, xPos, yPos, ctx, fillColor, borderColor, borderWidth) {
  
  this.radius      = radius;
  this.speed       = speed;
  this.width       = width;
  this.xPos        = xPos;
  this.yPos        = yPos;
  
  this.fillColor   = fillColor;
  this.borderColor = borderColor;
  this.borderWidth = borderWidth;

  this.ctx = ctx;
  this.ctx.scale(1, 1);

  this.counter = 0;

  var signHelper = Math.floor(Math.random() * 2);

  if (signHelper == 1) {
      this.sign = -1;
  } else {
      this.sign = 1;
  }
}

Circle.prototype.update = function () {
  this.ctx.scale(1, 1);

  this.counter += this.sign * this.speed;

  this.ctx.beginPath();
   
  this.ctx.arc(this.xPos + Math.cos(this.counter / 100) * this.radius, 
                  this.yPos + Math.sin(this.counter / 100) * this.radius, 
                  this.radius, 
                  0, 
                  Math.PI * 2,
                  false);
                   
  this.ctx.closePath();

  if (this.fillColor) {
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fill();
  }

  if (this.borderColor && this.borderWidth) {
    this.ctx.lineWidth = this.borderWidth;
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.stroke();
  };
};


function Line(speed, xStart, yStart, xEnd, yEnd, ctx, lineColor, lineWidth) {
  this.ctx       = ctx;

  this.ctx.scale(1, 1);
  
  this.xStart    = xStart;
  this.yStart    = yStart;
  this.xEnd      = xEnd;
  this.yEnd      = yEnd;
  
  this.lineWidth = lineWidth;
  this.lineColor = lineColor;
  
  this.speed     = speed;

  ctx.beginPath();
  ctx.moveTo(xStart, yStart);
  ctx.lineTo(xEnd, yEnd);
  ctx.stroke();

  this.counter = 0;

  var signHelper = Math.floor(Math.random() * 2);
  
  if (signHelper == 1) {
      this.sign = -1;
  } else {
      this.sign = 1;
  }
}

Line.prototype.update = function () {
  this.ctx.scale(1, 1);

  this.ctx.beginPath();
  this.ctx.moveTo(this.xStart, this.yStart);
  this.ctx.lineTo(this.xEnd, this.yEnd);

  if (this.lineWidth && this.lineColor) {
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.stroke();
  };
};

function Triangle(speed, point0, point1, point2, ctx, fillColor, borderColor, borderWidth) {
  this.ctx         = ctx;
  
  this.point0      = point0;
  this.point1      = point1;
  this.point2      = point2;
  
  this.fillColor   = fillColor;
  this.strokeColor = borderColor;
  this.strokeWidth = borderWidth;

  this.ctx.scale(1.0, 1.0);
  
  this.speed       = speed;

  ctx.beginPath();
  ctx.moveTo(point0.x, point0.y);
  ctx.lineTo(point1.x, point1.y);
  ctx.lineTo(point2.x, point2.y);
  ctx.closePath();

  this.counter = 0;

  var signHelper = Math.floor(Math.random() * 2);
  
  if (signHelper == 1) {
      this.sign = -1;
  } else {
      this.sign = 1;
  }
}

Triangle.prototype.update = function () {
  this.counter += this.sign * this.speed;

  this.ctx.beginPath();
  this.ctx.moveTo(this.point0.x + Math.cos(this.counter / 5),this.point0.y + Math.sin(this.counter / 5));
  this.ctx.lineTo(this.point1.x + Math.cos(this.counter / 5), this.point1.y + Math.sin(this.counter / 5));
  this.ctx.lineTo(this.point2.x + Math.cos(this.counter / 5), this.point2.y + Math.sin(this.counter / 5));
  this.ctx.closePath();


  if (this.strokeWidth && this.strokeColor) {
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.lineWidth = this.strokeWidth;
    this.ctx.stroke();
  };

  if (this.fillColor) {
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fill();
  };

  this.ctx.closePath();

  this.ctx.save();
  this.ctx.rotate(0.17 * this.counter);
  this.ctx.restore();
};


var FullscreenAnimationCanvas = function() {
  var self = this;

  var canvas = document.getElementById('canvas');
  this.ctx = canvas.getContext('2d');
  this.center = {};

  this.ctx.canvas.width  = window.innerWidth;
  this.ctx.canvas.height = window.innerHeight;
  
  this.center.x = canvas.width / 2;
  this.center.y = canvas.height / 2;
  console.log(window.innerWidth * .3)
  this.circles = [];
  this.shapeCirclesDatas = [
    {"radius": 50, "speed": .001, 
    "size": 100, "posX": window.innerWidth * .3, "posY": 60,
    "fillColor": "rgb(57, 73, 171)", "borderColor" : null, "borderWidth": 12},
    {"radius": 150, "speed": .02, 
    "size": 250, "posX": 310, "posY": 350,
    "fillColor": "rgb(248, 187, 208)", "borderColor" : null, "borderWidth": 12},
    {"radius": 40, "speed": .02, 
    "size": 50, "posX": 350, "posY": 60,
    "fillColor": "rgb(255, 128, 171)", "borderColor" : null, "borderWidth": 12},
    {"radius": 70, "speed": .02, 
    "size": 50, "posX": this.ctx.canvas.width - 400, "posY": 150,
    "fillColor": "rgb(255, 255, 255)", "borderColor" : null, "borderWidth": 12}
  ]

  this.lines = [];
  this.shapeLinesDatas = [
    {"speed": .3, "xStart": 100, "yStart": 100, "xEnd": 150, "yEnd": 550, "lineColor": "red", "lineWidth": 5},
    {"speed": .9, "xStart": 900, "yStart": 100, "xEnd": 150, "yEnd": 550, "lineColor": "white", "lineWidth": 3}
  ]


  this.triangles = [];
  // (speed, point0, point1, point2, ctx, fillColor, borderColor, borderWidth)
  this.shapeTrianglesDatas = [
    {"speed": 1.5, "point0": {x: 100, y: 100}, "point1":  {x: 150, y: 200}, "point2":  {x: 50, y: 200}, "fillColor": null, "strokeColor": "white", "strokeWidth": 1}
  ]

  
  draw();


  function draw () {
    self.ctx.clearRect(0, 0, self.ctx.canvas.width, self.ctx.canvas.height);

    var randomX = 0;
    var randomY = 0;

    setupShapes()
  }

  function setupShapes() {
    for (var i = 0; i < self.shapeCirclesDatas.length; i++) {
        var randomX = getRandomArbitrary(self.shapeCirclesDatas[i].posX, self.shapeCirclesDatas[i].posX + 50)
        var randomY = getRandomArbitrary(self.shapeCirclesDatas[i].posY, self.shapeCirclesDatas[i].posY + 50)
        var speed   = .1;
        var size    = self.shapeCirclesDatas[i].size;
        var radius  =  self.shapeCirclesDatas[i].radius;

        var fillColor = self.shapeCirclesDatas[i].fillColor;
        var borderColor = self.shapeCirclesDatas[i].borderColor;
        var borderWidth = self.shapeCirclesDatas[i].borderWidth;
        

        var circle = new Circle(radius, speed, size, randomX, randomY, self.ctx, fillColor, borderColor, borderWidth);
        self.circles.push(circle);
    }

    
    for (var i = 0; i < self.shapeLinesDatas.length; i++) {
      var posXStart = self.shapeLinesDatas[i].xStart;
      var posYStart = self.shapeLinesDatas[i].yStart;
      var posXEnd   = self.shapeLinesDatas[i].xEnd;
      var posYEnd   = self.shapeLinesDatas[i].yEnd;

      var lineColor = self.shapeLinesDatas[i].lineColor;
      var lineWidth = self.shapeLinesDatas[i].lineWidth;

      var speed   = .1;

     // (speed, xStart, yStart, xEnd, yEnd, ctx, lineColor, lineWidth)
      var line = new Line(speed, posXStart, posYStart, posXEnd, posXEnd, self.ctx, lineColor, lineWidth);
      self.lines.push(line);
    }


    for (var i = 0; i < self.shapeTrianglesDatas.length; i++) {  
      var point0      = self.shapeTrianglesDatas[i].point0;
      var point1      = self.shapeTrianglesDatas[i].point1;
      var point2      = self.shapeTrianglesDatas[i].point2;
      
      var fillColor   = self.shapeTrianglesDatas[i].fillColor;
      var strokeColor = self.shapeTrianglesDatas[i].strokeColor;
      var strokeWidth = self.shapeTrianglesDatas[i].strokeWidth;

      var speed   = .1;

     // (speed, point0, point1, point2, ctx, fillColor, borderColor, borderWidth)
      var triangle = new Triangle(speed, point0, point1, point2, self.ctx, fillColor, strokeColor, strokeWidth);
      self.lines.push(triangle);
    }

    drawAndUpdate();
  }

  function drawAndUpdate() {
    self.ctx.clearRect(0, 0, self.ctx.canvas.width, self.ctx.canvas.height);

    for (var i = 0; i < self.circles.length; i++) {       
      var circle = self.circles[i];
      circle.update();
    }

    for (var i = 0; i < self.lines.length; i++) {       
      var line = self.lines[i];
      line.update();
    }

    for (var i = 0; i < self.triangles.length; i++) {       
      var triangle = self.triangles[i];
      triangle.update();
    }
     
    requestAnimationFrame(drawAndUpdate);
  }
}

var fullscreenAnimationCanvas = new FullscreenAnimationCanvas();


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
