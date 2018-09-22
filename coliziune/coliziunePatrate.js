window.onload = (function() {
    var parentDiv;
    var square1Height;
    var square1Width;
    var square2Height;
    var square2Width;
    var square1;
    var square2;
    var rsquare1;
    var rsquare2;
    var bordersquare1;
    var bordersquare2;

    parentDiv = document.getElementById("parent-div");
    var unit = "px";
    square1Height = 80;
    square1PosX = 150;
    square1PosY = 150;
    square1Width = square1Height;
    square2Height = 400;
    square2Width = square2Height;
    bordersquare1 = 10;
    bordersquare2 = 1;

    square1 = document.createElement("div");
    square1.style.height = square1Height + unit;
    square1.style.width = square1Width + unit;
    square1.style.border = bordersquare1 + "px solid black";
    square1.style.position = "absolute";
    square1.style.left = square1PosX + unit;
    square1.style.top = square1PosY + unit;

    square2 = document.createElement("div");
    square2.style.height = square2Height + unit;
    square2.style.width = square2Width + unit;
    square2.style.border = bordersquare2 + "px solid black";
    square2.style.position = "absolute";
    square2.style.left = (square1PosX * 2) + unit;
    square2.style.top = (square1PosY * 2) + unit;

    parentDiv.appendChild(square1);
    parentDiv.appendChild(square2);

    square2.onmousedown = function(event) {

        square2.style.position = 'absolute';
        parentDiv.appendChild(square2);

        onMouseMove(event);

        function onMouseMove(event) {
            var clientX = event.clientX
            var clientY = event.clientY

            square2.style.left = clientX - square2.offsetWidth / 2 + 'px';
            square2.style.top = clientY - square2.offsetHeight / 2 + 'px';

            verifyCollision(square1, square2);
        }

        // move the square2 on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // remove unneeded handlers
        square2.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
        };

    };

        square2.ondragstart = function() {
            return false;
        };


    function verifyCollision(square1, square2) {
        var sq1Left = square1.offsetLeft;
        var sq1Right = square1.offsetLeft + square1.offsetWidth;
        var sq1Top = square1.offsetTop;
        var sq1Bottom = square1.offsetTop + square1.offsetHeight;

        var sq2Left = square2.offsetLeft;
        var sq2Right = square2.offsetLeft + square2.offsetWidth;
        var sq2Top = square2.offsetTop;
        var sq2Bottom = square2.offsetTop + square2.offsetHeight;

        if (sq2Left > sq1Right || sq2Right < sq1Left || sq2Top > sq1Bottom || sq2Bottom < sq1Top) {
            square2.style.backgroundColor = "#fff";
        } else {
            square2.style.backgroundColor = "#eeff00";
        }
    }
}());