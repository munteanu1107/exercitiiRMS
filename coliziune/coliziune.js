window.onload = (function() {
    var parentDiv;
    var circle1Height;
    var circle1Width;
    var circle2Height;
    var circle2Width;
    var circle1;
    var circle2;
    var rCircle1;
    var rCircle2;
    var borderCircle1;
    var borderCircle2;

    parentDiv = document.getElementById("parent-div");
    rCircle1 = 40;
    rCircle2 = 10;
    var unit = "px";
    circle1Height = rCircle1 * 2;
    circle1PosX = 150;
    circle1PosY = 150;
    circle1Width = rCircle1 * 2;
    circle2Height = rCircle2 * 2;
    circle2Width = rCircle2 * 2;
    borderCircle1 = 20;
    borderCircle2 = 1;

    circle1 = document.createElement("div");
    circle1.style.height = circle1Height + unit;
    circle1.style.width = circle1Width + unit;
    circle1.style.border = borderCircle1 + "px solid black";
    circle1.style.borderRadius = "50%";
    circle1.style.position = "absolute";
    circle1.style.left = circle1PosX + unit;
    circle1.style.top = circle1PosY + unit;

    circle2 = document.createElement("div");
    circle2.style.height = circle2Height + unit;
    circle2.style.width = circle2Width + unit;
    circle2.style.border = borderCircle2 + "px solid black";
    circle2.style.borderRadius = "50%";
    circle2.style.position = "absolute";
    circle2.style.left = (circle1PosX * 2) + unit;
    circle2.style.top = (circle1PosY * 2) + unit;

    parentDiv.appendChild(circle1);
    parentDiv.appendChild(circle2);

    circle2.onmousedown = function(event) {

        circle2.style.position = 'absolute';
        parentDiv.appendChild(circle2);

        onMouseMove(event);

        document.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseup', onBodyMouseUp);

      };

      circle2.ondragstart = function() {
        return false;
      };

    function onMouseMove(event) {
        var clientX = event.clientX;
        var clientY = event.clientY;

        if (clientX - circle2.offsetWidth / 2 > 500) {
            circle2.style.left = 500 + 'px';
        } else {
            circle2.style.left = clientX - circle2.offsetWidth / 2 + 'px';
          }

        circle2.style.top = clientY - circle2.offsetHeight / 2 + 'px';

        verifyDistance(clientX, clientY);

    }

    function onBodyMouseUp() {
        document.body.removeEventListener('mouseup', onBodyMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }

    function verifyDistance(circle2X, circle2Y) {
        var totalR = (rCircle1 + borderCircle1) + (rCircle2 + borderCircle2);
        var circle1PosX2 = circle1PosX + rCircle1 + borderCircle1;
        var circle1PosY2 = circle1PosY + rCircle1 + borderCircle1;
        var distanceBetweenMouseAndEl = Math.sqrt(Math.pow(circle2X - circle1PosX2, 2) + Math.pow(circle2Y - circle1PosY2, 2));

        if(distanceBetweenMouseAndEl < totalR) {
            circle2.style.backgroundColor = "#eeff00";
        } else {
            circle2.style.backgroundColor = "#fff";
        }
    }
}());