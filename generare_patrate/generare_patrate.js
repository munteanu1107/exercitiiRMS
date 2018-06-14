window.onload = (function() {
    var container;
    var row;
    var parentSquare;
    var square;

    var initialVal = 4;
    var test = initialVal;

    container = document.getElementById("container");
    square = document.createElement("div");

    function createSquare() {
        square = document.createElement("div");
        square.style.width = "50px";
        square.style.height = "50px";
        square.style.margin = "5px";
        square.style.backgroundColor = "green";
        square.style.display = "inline-block";

        parentSquare.appendChild(square);
    }

    function createRows(num) {
        if(num === 0) {
            return;
        }

        parentSquare = document.createElement("div");

        createSquaresPerRows(num);

        return createRows(num - 1);
    }

    function createSquaresPerRows(num) {
        if(num === 0) {
            row = document.createElement("div");
            row.appendChild(parentSquare);
            container.appendChild(row);

            return;

        } else {
            createSquare();
        }

        return createSquaresPerRows(num - 1);
    }

    createRows(initialVal)
}());