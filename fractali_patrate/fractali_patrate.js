window.onload = (function() {
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width  = 600;
    canvas.height = 600;
    var timmer = 1;


    function drawSquare(x, y, l) {

        ctx.rect(x, y, l, l);
        ctx.stroke();

        if(l > 10) {
            drawStepByStep(x, y, l, drawSquare)
        }
    }


    drawSquare(250,250, 80);

    function drawStepByStep(a, b, c) {
        timmer++;

        (function f(a,b,c) {
            var x = a;
            var y = b;
            var l = c;

            setTimeout(function () {
                drawSquare(x + (l / 2) + (l / 4), y - (l / 4), l / 2);
                drawSquare(x - (l / 2) + (l / 4), y - (l / 4), l / 2);
                drawSquare(x - (l / 2) + (l / 4), y + (l / 2) + (l / 4), l / 2);
                drawSquare(x + (l / 2) + (l / 4), y + (l / 2) + (l / 4), l / 2);
            }, timmer * 300);
        })(a, b, c);
    }
}());