window.onload = (function() {
    // DOM buttons
    var backSlashBtn;
    var upSlashBtn;
    var colorBackSlashBtn;
    var colorUpSlashBtn;
    var colorLinesBtn;
    var chessTableBtn;


    var cols = 12;
    var lines = cols;
    var el = 50;
    var distance = 4;
    var matrixOfElements = [];

    var parentDiv;
    var width = cols * (el + distance) + distance;
    var height = lines * (el + distance) + distance;

    parentDiv = document.getElementById("parent-div");
    parentDiv.style.height = height + "px";
    parentDiv.style.width = width + "px";
    parentDiv.style.border = "1px solid #000";
    parentDiv.style.fontSize = "0px";
    parentDiv.style.display = "inline-block";

    function generateDivElement() {
        var childDiv;
        var generateId = 1;

        for(var i = 0; i < lines; i++) {
            matrixOfElements[i] = [];

            for(var j = 0; j < cols; j++) {
                childDiv = document.createElement("div");
                childDiv.id = generateId;
                generateId++;
                childDiv.style.height = el + "px";
                childDiv.style.width = el + "px";
                childDiv.style.backgroundColor = "#57ede0";
                childDiv.style.display = "inline-block";
                childDiv.style.marginLeft = distance + "px";
                childDiv.style.marginTop = distance + "px";

                childDiv.onmouseover = returnMouseOverElement;
                childDiv.onmouseleave  = returnMouseLeaveElement;

                matrixOfElements[i][j] = childDiv;
                parentDiv.appendChild(childDiv);
            }

        }

        return matrixOfElements;

    }

    generateDivElement();

    function returnMouseOverElement() {
        this.style.opacity = "0.5"
    }

    function returnMouseLeaveElement() {
        this.style.opacity = "1"
    }

    function getAccessToDomElements(arr, callback) {
        var index = index;
        var loopArray = [];

        for(var i = 0; i < arr.length; i++) {
            loopArray[loopArray.length] = arr[i];

            callback(loopArray, i);
        }
    }

    function chessTable(item, counter) {
        for(var j = 0; j < item[counter].length; j++) {
            if (counter % 2 == j % 2) {
                item[counter][j].style.backgroundColor = "#fff";
            } else {
                item[counter][j].style.backgroundColor = "#000";
            }
        }
    }

    function colorEvenLines(item, counter) {
        for(var j = 0; j < item[counter].length; j++) {
            if(counter % 2 !== 0) {
                item[counter][j].style.backgroundColor = "#42e20d";
            }
        }
    }

    function colorUpToSlash(item, counter) {
        for(var j = (item[counter].length - (counter + 2)); j >= 0; j--) {
            item[counter][j].style.backgroundColor = "#c01ac9";

        }
    }

    function colorBackSlash(item, counter) {
        for(var j = 0; j < (item.length - 1); j++) {
            item[counter][j].style.backgroundColor = "#896123";
        }
    }

    function getBackSlash() {
        for (var i = 0; i < matrixOfElements.length; i++) {
            for (var j = 0; j < matrixOfElements.length; j++) {
                matrixOfElements[i][j].style.backgroundColor = "#523456";
                i++;
            }
        }
    }

    function getSlash() {
        for (var i = 0; i < matrixOfElements.length; i++) {
            for (var j = (matrixOfElements.length - 1); j >= 0; j--) {
                matrixOfElements[i][j].style.backgroundColor = "#ff0000"
                i++
            }
        }
    }

    backSlashBtn = document.getElementById("diagonala-principala");
    upSlashBtn = document.getElementById("diagonala-secundara");
    colorBackSlashBtn = document.getElementById("down-diagonala-principala");
    colorUpSlashBtn = document.getElementById("up-diagonala-secundara");
    colorLinesBtn = document.getElementById("linii-pare");
    chessTableBtn = document.getElementById("tabla-sah");

    backSlashBtn.addEventListener("click", function() {
        getBackSlash();
    });

    upSlashBtn.addEventListener("click", function() {
        getSlash()
    });

    colorLinesBtn.addEventListener("click", function() {
        getAccessToDomElements(matrixOfElements, colorEvenLines);
    });

    colorUpSlashBtn.addEventListener("click", function() {
        getAccessToDomElements(matrixOfElements, colorUpToSlash);
    });

    colorBackSlashBtn.addEventListener("click", function() {
        getAccessToDomElements(matrixOfElements, colorBackSlash);
    });

    chessTableBtn.addEventListener("click", function() {
        getAccessToDomElements(matrixOfElements, chessTable);
    });

}());
