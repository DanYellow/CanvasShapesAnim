$(function() {
  var s = Snap("#canvas");

  Snap.load("../assets/anim-intro.svg", function (f) {

      var purpleTriangle = f.select('#purple_x5F_circle');
      console.log(purpleTriangle);
      var whiteTriangle = f.select('#white_x5F_triangle');
      var blueCircle = f.select('#blue_x5F_circle');
      wCProperties = _.mapObject(whiteTriangle.getBBox(), function(val, key){ return parseInt(val); });

      var c = s.rect(wCProperties.cx - 30, wCProperties.cy - 130, 1, 150);
      c.attr({
        fill: "#fff"
      });
       c.attr({ transform: 'rotate(-35 ' + c.getBBox().cx + ' ' + c.getBBox().cy + ')'});

      var topLeftGroup = s.group(blueCircle, whiteTriangle, c);
      var tLGProperties = topLeftGroup.getBBox()
      tLGProperties = _.mapObject(topLeftGroup.getBBox(), function(val, key){ return parseInt(val); });

     
      topLeftGroupAnimation()
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

      whiteTriangleAnimation()
      function whiteTriangleAnimation(){
        whiteTriangle.stop().animate(
          { transform: 'r360, 256, 256'},
          18000,
          function(){ 
              whiteTriangle.attr({ transform: 'rotate(0 256 256)'});
              purpleTriangleAnimation();
          }
        );
      }

      s.append(topLeftGroup);
      s.append(purpleTriangle);
  });
});

