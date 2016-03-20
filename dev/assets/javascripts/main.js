$(function() {
  var s = Snap('#canvas');

  function infRotate( el, time, rPosX, rPosY, posX, posY ) {
    var fromTransformation = 't' + posX + ',' + posY + ', r0, ' + rPosX + ', ' + rPosY;
    var toTransformation   = 't' + posX + ',' + posY + ', r360, ' + rPosX + ', ' + rPosY;

    el.transform(fromTransformation);
    el.animate({ transform: toTransformation }, time, mina.linear, infRotate.bind(null, el, time, rPosX, rPosY, posX, posY));
  };


  Snap.load('../assets/images/anim-intro.svg', function (canvas) {
    /**
     * SVG forms definitions
     */

    var purpleCircle = canvas.select('#purple_x5F_circle');
    var redCircle = canvas.select('#red_x5F_circle');
    var pinkCircleSmall = canvas.select('#pink_x5F_triangle_x5F_small');
    var pinkTriangle = canvas.select('#pink_x5F_triangle');
    
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
    // topLeftGroupAnimation();
    infRotate(topLeftGroup, 10000, 50, 50, 260, 210);


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
    bottomLeftGroup.transform('t260, 710');

  
    var bLGProperties = bottomLeftGroup.getBBox();
    bLGProperties = _.mapObject(bottomLeftGroup.getBBox(), function(val, key){ return parseInt(val); });


    whiteCircle.attr({ cx: 50, cy: -15 });
    pinkCircle.attr({ cx: 0, cy: 0 });

    blueTriangle.transform('t80, -20, r50');
    darkBlueTriangle.transform('t85, -120, r70');



    infRotate(bottomLeftGroup, 8000, 0, 0, 260, 710);

    infRotate(blueTriangle, 16000, 0, 0, 80, -20);
    s.append(bottomLeftGroup);


    var bottomRightGroup = s.group(purpleCircle, pinkCircleSmall, pinkTriangle, redCircle);
    bottomRightGroup.transform('t860, 410');

    redCircle.transform('t150,80');
    pinkCircle.transform('t150,-80');
    pinkTriangle.transform('t150,-80');
  });
});

