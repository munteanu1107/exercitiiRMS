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


function DrawBranch(depth, x, y, length, theta, length_scale, dtheta, height) {
        ctx.beginPath();
        var x1 = 0;
        var y1 = 0;

        if(depth === height) {
            ctx.moveTo(x, y);
            ctx.lineTo(x, y - length);
            ctx.stroke();

            x1 = x;
            y1 = y - length;
        } else {


            ctx.moveTo(x, y);
            x1 = (x - length * Math.cos(theta * (Math.PI / 180)));
            y1 = (y - length * Math.sin(theta * (Math.PI / 180)));

            ctx.lineTo(x1, y1);
            ctx.stroke();
        }

    if (depth > 1) {
        DrawBranch(depth - 1, x1, y1, length * length_scale, theta + dtheta, length_scale, dtheta, height);
        DrawBranch(depth - 1, x1, y1, length * length_scale, theta - dtheta, length_scale, dtheta, height);
    }
}

    DrawBranch(10, 250, 300, 50, 45, 0.75, 35, 10);

}());