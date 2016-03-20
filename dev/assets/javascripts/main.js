$(function() {
  var s = Snap('#canvas');

  Snap.load('../assets/anim-intro.svg', function (canvas) {
    /**
     * SVG forms definitions
     */

    var purpleCircle = canvas.select('#purple_x5F_circle');
    var redCircle = canvas.select('#red_x5F_circle');
    var pinkCircle = canvas.select('#pink_x5F_circle');
    
    var whiteTriangle = canvas.select('#white_x5F_triangle');
    var blueCircle = canvas.select('#blue_x5F_circle');

    var pinkCircle = canvas.select('#pink_x5F_circle');
    var blueTriangle = canvas.select('#blue_x5F_triangle');
    var whiteCircle = canvas.select('#white_x5F_circle');
    var darkBlueTriangle = canvas.select('#dark_x5F_blue_x5F_triangle');


    // Properties of the white triangle
    var wTProps = _.mapObject(whiteTriangle.getBBox(), function(val, key){ return parseInt(val); });

    var whiteLine = s.rect(wTProps.cx - 30, wTProps.cy - 130, 1, 150);
    whiteLine.attr({
      fill: '#fff'
    });
    whiteLine.attr({ transform: 'rotate(-35 ' + whiteLine.getBBox().cx + ' ' + whiteLine.getBBox().cy + ')'});

    var topLeftGroup = s.group(blueCircle, whiteTriangle, whiteLine);
    
    var tLGProperties = topLeftGroup.getBBox()
    tLGProperties = _.mapObject(topLeftGroup.getBBox(), function(val, key){ return parseInt(val); });

   
    function topLeftGroupAnimation(){
      topLeftGroup.stop().animate(
        { transform: 'r360, ' + tLGProperties.cx + ', ' + tLGProperties.cy },
        10000,
        function(){
          topLeftGroup.attr({ transform: 'rotate(0 ' + tLGProperties.cx + ' ' + tLGProperties.cy + ')'});
          topLeftGroupAnimation();
        }
      );
    }
    topLeftGroupAnimation();

    function whiteTriangleAnimation(){
      whiteTriangle.stop().animate(
        { transform: 'r360, 256, 256'},
        18000,
        function(){ 
            whiteTriangle.attr({ transform: 'rotate(0 256 256)'});
            whiteTriangleAnimation();
        }
      );
    }
    whiteTriangleAnimation();

    s.append(topLeftGroup);
    

    var bottomLeftGroup = s.group(pinkCircle, whiteCircle, blueTriangle, darkBlueTriangle);
    bottomLeftGroup.transform('t260, 410');

  
    var bLGProperties = bottomLeftGroup.getBBox();
    bLGProperties = _.mapObject(bottomLeftGroup.getBBox(), function(val, key){ return parseInt(val); });


    whiteCircle.attr({ cx: 120, cy: 0 });
    pinkCircle.attr({ cx: 0, cy: 0 });

    blueTriangle.transform('t-50, -200');
    darkBlueTriangle.transform('t-110, -90, r60');

    function infRotate( el, time, rPosX, rPosY, posX, posY ) {
      var fromTransformation = 't' + posX + ',' + posY + ', r0, ' + rPosX + ', ' + rPosY;
      var toTransformation   = 't' + posX + ',' + posY + ', r360, ' + rPosX + ', ' + rPosY;

      el.transform(fromTransformation);
      el.animate({ transform: toTransformation }, time, mina.linear, infRotate.bind(null, el, time, rPosX, rPosY, posX, posY));
    };

    infRotate(bottomLeftGroup, 8000, 150, 150, 260, 410);

    infRotate(blueTriangle, 16000, 150, 150, -50, -200);
    console.log(blueTriangle.getBBox().cx)
    s.append(bottomLeftGroup);


    var bottomRightGroup = s.group(purpleCircle, pinkCircle, redCircle);

  });
});

