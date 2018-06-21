window.onload = (function() {
    var container;
    var controller;
    var tree;
    var depth;
    var length;
    var scaleLength;
    var theta;

    container = document.getElementById("container");
    controller = document.getElementById("controller");
    tree = document.getElementById("tree");

    depth = document.getElementById("depth").value;
    length = document.getElementById("length").value;
    scaleLength = document.getElementById("lengthScale").value;
    theta = document.getElementById("dTheta").value;
    var canvas = document.getElementById('canvas_main');
    canvas.width  = 600;
    canvas.height = 600;
    var ctx = canvas.getContext('2d');

    function DrawBranch(depth, height, x, y, length, theta, length_scale, dtheta) {
        ctx.beginPath();

        var x1 = 0;
        var y1 = 0;

        if (depth == height) {
            ctx.moveTo(x, y);
            ctx.lineTo(x, y - length);
            ctx.stroke();

            x1 = x;
            y1 = y - length;
        } else {
            ctx.moveTo(x, y);

            // See where this branch should end.
            x1 = (x + length * Math.cos((theta) * Math.PI / 180));
            y1 = (y - length * Math.sin((theta) * Math.PI / 180));

            ctx.lineTo(x1, y1);
            ctx.stroke();
        }

        // If depth > 1, draw the attached branches.
        if (depth > 1) {
            DrawBranch(depth - 1, height, x1, y1, length * length_scale, theta + dtheta, length_scale, dtheta);
            DrawBranch(depth - 1, height, x1, y1, length * length_scale, theta - dtheta, length_scale, dtheta);
        }

    }
    var contor = 0;
    var step = 1;

    var t = setInterval(function() {
        ctx.clearRect(0,0,600,600);
        ctx.fill()
        DrawBranch(16, 16, 250, 300, 70, 90, 0.75, contor);
        contor+= step;
        if (contor < 0 || contor > 90) {
            step *= -1;
        }
    }, 100)


}());