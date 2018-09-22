window.onload = (function() {

    var mouseX;
    var mouseY;
    var cols = 20;
    var lines = cols;
    var el = 15;
    var distance = 4;
    var matrixOfElements = [];
    var r = 60;
    var unit = "px";
    var objArray = [];
    var obj = {};
    var body = document.body;

    var parentDiv;
    var startElem;
    var width = cols * (el + distance) + distance;
    var height = lines * (el + distance) + distance;
    var circle = document.getElementById("circle");
    var circle2 = document.getElementById("circle2");
    body.addEventListener("mousemove", verifyDistance);

    parentDiv = document.getElementById("parent-div");
    parentDiv.style.height = height + "px";
    parentDiv.style.width = width + "px";
    parentDiv.style.position = "absolute";

    function generateDivElement() {
        var childDiv;
        var generateId = 1;

        var xPos = 4;
        var yPos = 4;
        for(var i = 0; i < lines; i++) {
            matrixOfElements[i] = [];
            xPos = 4;

            for(var j = 0; j < cols; j++) {
                childDiv = document.createElement("div");
                childDiv.id = generateId;
                generateId++;
                childDiv.style.height = el + "px";
                childDiv.style.width = el + "px";
                childDiv.style.backgroundColor = "#57ede0";
                childDiv.style.position = "absolute";
                childDiv.style.left = xPos + "px";
                childDiv.style.borderRadius = "50%";
                childDiv.style.top = yPos + "px";
                childDiv.style.marginTop = -(el / 2) + "px";
                childDiv.style.marginLeft = -(el / 2) + "px";

                matrixOfElements[i][j] = childDiv;
                obj.el = childDiv;
                obj.x = xPos;
                obj.y = yPos;
                objArray[objArray.length] = obj;
                obj = {};
                xPos += el + distance;
                parentDiv.appendChild(childDiv);
            }

            yPos += el + distance;
        }

        return matrixOfElements;

    }

    function verifyDistance(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        circle.style.top = mouseY + "px";
        circle.style.left = mouseX + "px";
        var array = objArray;
        for(var i = 0; i < array.length; i++) {

            var distanceBetweenMouseAndEl = Math.sqrt(Math.pow(mouseX - array[i].x, 2) + Math.pow(mouseY - array[i].y, 2));
            var element = array[i].el;

            if(distanceBetweenMouseAndEl < r) {
                element.style.backgroundColor = "#000";
            } else {
                element.style.backgroundColor = "#57ede0";
            }
        }
    }

    generateDivElement();
}());