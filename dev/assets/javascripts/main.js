$(function() {
  var s = Snap('#canvas');

  Snap.load('../assets/anim-intro.svg', function (canvas) {

      /**
       * SVG forms definitions
       */

      var purpleCircle = canvas.select('#purple_x5F_circle');
      
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
      // s.append(purpleCircle);
      


      var bottomLeftGroup = s.group(pinkCircle, blueTriangle, darkBlueTriangle, whiteCircle);
      // bottomLeftGroup.transform('t260, 410');

    
      var bLGProperties = bottomLeftGroup.getBBox();
      bLGProperties = _.mapObject(bottomLeftGroup.getBBox(), function(val, key){ return parseInt(val); });
      
      
      console.log(bottomLeftGroup.getBBox());

      whiteCircle.attr({ cx: 0, cy: 0 });
      pinkCircle.attr({ cx: 0, cy: 0 });
      blueTriangle.attr({ cx: 0, cy: 0 });
      darkBlueTriangle.attr({ cx: 0, cy: 0 });


      function infRotate( el ) {
          el.transform('t123, 50, r0,150,150');
          el.animate({ transform: 't123, 50, r360,150,150' }, 2000, mina.linear, infRotate.bind( null, el));
      };

      infRotate(bottomLeftGroup);


      // function bottomLeftGroupAnimation(){
      //   bottomLeftGroup.stop().animate(
      //     { transform: 't260, 410, r360, ' + bLGProperties.x + ', ' + bLGProperties.y },
      //     5000,
      //     function(){
      //       bottomLeftGroup.attr({ transform: 't260, 410, r0 ' + bLGProperties.x + ', ' + bLGProperties.y });
      //       bottomLeftGroupAnimation();
      //     }
      //   );
      // }
      // bottomLeftGroupAnimation();

      s.append(bottomLeftGroup);
  });
});

