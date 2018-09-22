window.onload = (function() {
    var container;
    var row;
    var square;
    var rowXPos;

    var startVal = 4;
    var flag = true;
    var squareHeight = 50;
    var squareWidth = squareHeight;
    var distance = 4;
    var xPos = 4;
    var yPos = 4;

    container = document.getElementById("container");
    yPos = (distance * (yPos + squareHeight)) - squareHeight;
    rowXPos = 4;

    function createSquare(row) {
        square = document.createElement("div");
        square.style.width = squareWidth + "px";
        square.style.height = squareHeight + "px";
        square.style.backgroundColor = "red";
        square.style.position = "absolute";
        square.style.left = xPos + "px"

        xPos += (distance + squareWidth);
        row.style.position = "absolute";
        row.style.top = yPos + "px";
        row.style.left = rowXPos + "px";
        row.appendChild(square);
    }

    function recursiveGenerateSquares(no) {

        if (yPos < 0) {
            yPos = ((distance) * (distance + squareHeight)) + distance;
            rowXPos = (distance + squareWidth) / 2;
        }

        row = document.createElement("div");

        if(no === 0) {
            if(flag) {
                flag = false;
                recursiveGenerateSquares(startVal - 1)
            }
            return;
        }

        if(flag) {
            createNElements(no);
        } else{
            createNElementsSecondRound(no);
        }

        return recursiveGenerateSquares(no - 1);
    }

    function createNElements(number) {
        if(number === 0) {
            xPos = distance;
            yPos -= (distance + squareWidth);
            rowXPos += squareWidth / 2;
            container.appendChild(row);
            return;
        }

        createSquare(row,xPos);

        return createNElements(number - 1);
    }

    function createNElementsSecondRound(number) {

        if (number === 0) {
            xPos = distance;
            yPos += (distance + squareWidth);
            rowXPos += (distance + squareWidth) / 2;
            container.appendChild(row);
            return;
        }

        createSquare(row, xPos);

        return createNElementsSecondRound(number - 1);
    }

    recursiveGenerateSquares(startVal);
}());