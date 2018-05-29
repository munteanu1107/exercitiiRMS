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
    var n = 500;

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    body = document.getElementsByTagName("body")[0];
    unit = "px";

    function createBubble() {
        for(var i = 1; i <= n; i++) {
            circle = document.createElement("div");
            circleWidth = Math.floor(Math.random() * 50);
            circleHeight = circleWidth;
            circle.id = i;
            circle.style.width = circleWidth + unit;
            circle.style.height = circleHeight + unit;
            circle.style.border = "1px solid #007FFF";
            circle.style.borderRadius = "50%";
            circle.style.position = "absolute";
            ///circle.style.transform = ("translateZ(0)")

            body.appendChild(circle);

            elConfig.el = circle;
            elConfig.speed = 5 + Math.random() * 10;
            elConfig.oscillationSpeed = Math.random();
            elConfig.posX = screenWidth / 2;
            elConfig.posY = screenHeight / 2;
            elConfig.osc = 0;
            elConfig.oscDist = Math.random() * 100;

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

            element = bubblesArray[i].el;
            bubblesArray[i].osc += bubblesArray[i].oscillationSpeed;
            bubblesArray[i].posY -= bubblesArray[i].speed;

            if(bubblesArray[i].posY < 0) {
                bubblesArray[i].posY = coordY;
                bubblesArray[i].posX = coordX;
            }

            element.style.top = bubblesArray[i].posY + unit;
            element.style.left = (bubblesArray[i].posX + Math.sin(bubblesArray[i].osc) * bubblesArray[i].oscDist) + unit;
        }

        window.requestAnimationFrame(moveBubbelOnTop);
    }

    document.addEventListener("mousemove",getRealTimeMouseCoord);
}());