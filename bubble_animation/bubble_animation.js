window.onload = (function() {
    var screenWidth;
    var screenHeight;
    var coordX;
    var coordY;
    var unit;
    var body;
    var circle;
    var circleWidth;
    var circleHeight;
    var bubblesArray = [];
    var elConfig = {};

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    body = document.getElementsByTagName("body")[0];
    unit = "px";

    function createBubble() {
        for(var i = 1; i <= 50; i++) {
            circle = document.createElement("div");
            circleWidth = Math.floor(Math.random() * 50);
            circleHeight = circleWidth;
            circle.id = i;
            circle.style.width = circleWidth + unit;
            circle.style.height = circleHeight + unit;
            circle.style.border = "1px solid #007FFF";
            circle.style.borderRadius = "50%";
            circle.style.position = "absolute";

            body.appendChild(circle);

            elConfig.el = circle;
            elConfig.speed = 6;
            elConfig.oscillationSpeed = Math.floor(Math.random() * 50);
            elConfig.posX = screenWidth / 2;
            elConfig.posY = screenHeight / 2;

            circle.style.top =  elConfig.posY + unit;
            circle.style.left = elConfig.posX + unit;

            bubblesArray[bubblesArray.length] = elConfig;
            elConfig = {};
        }
    }

    createBubble();

    function getRealTimeMouseCoord(e) {
        coordX = e.clientX;
        coordY = e.clientY;
    }

    moveBubbelOnTop();


    function moveBubbelOnTop() {
        var element;
        var index = 0;



        for(var i = 0; i < bubblesArray.length; i++) {
            var currentOscillation = Math.abs(Math.sin(i).toPrecision(2));
            currentOscillation = currentOscillation < .2 ? 0 : currentOscillation;

            element = bubblesArray[i].el;
            bubblesArray[i].posY -= bubblesArray[i].speed;
            bubblesArray[i].posX += Math.sin(5) * bubblesArray[i].oscillationSpeed;

            if(bubblesArray[i].posY < 0) {
                bubblesArray[i].posY = coordY;
            }

            element.style.top = bubblesArray[i].posY + unit;
            element.style.left = -(bubblesArray[i].posX) + unit;
            index += bubblesArray[i].speed;
        }

        window.requestAnimationFrame(moveBubbelOnTop);
    }

    document.addEventListener("mousemove", function(event) {
        getRealTimeMouseCoord(event);
    });
}());