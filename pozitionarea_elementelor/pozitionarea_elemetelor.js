window.onload = (function() {
    var backSlash = document.getElementById("diagonala-principala");
    var upSlash = document.getElementById("diagonala-secundara");
    var colorBackSlash = document.getElementById("down-diagonala-principala");
    var colorUpSlash = document.getElementById("up-diagonala-secundara");
    var colorLines = document.getElementById("linii-pare");
    var chessTableEl = document.getElementById("tabla-sah");

    var parentDivChildNodes;
    var row;
    var pixelUnit = "px"
    var parentDiv = document.getElementById("parent-div")
    var parentDivWidth = 400;
    var parentDivHeight = parentDivWidth;
    var parentDivBackgroundColor = "#f1f1f1"
    var parentDivBorder = "1px solid #000000"

    parentDiv.style.width = parentDivWidth + pixelUnit;
    parentDiv.style.height = parentDivHeight + pixelUnit;
    parentDiv.style.backgroundColor = parentDivBackgroundColor;
    parentDiv.style.border = parentDivBorder;

    function createSpanElements(bgColor) {
        var span = document.createElement("div");
        span.style.width = (parentDivWidth / 10) + pixelUnit;
        span.style.height = (parentDivHeight / 10) + pixelUnit;
        span.style.marginLeft = 5 + pixelUnit;
        span.style.display = "inline-block";
        span.style.backgroundColor = bgColor;
        row.appendChild(span);
    }

    function pushSpanElementToParentDiv() {
        for (var i=0; i < (parentDivHeight / 50); i++){
            row = document.createElement("div");
            parentDiv.appendChild(row);
            for (var j=0; j < (parentDivHeight / 50); j++){
                createSpanElements("#12c1ed");
            }
        }

        parentDivChildNodes = Array.prototype.slice.call(parentDiv.childNodes);
    }



    function getAccessToDomElements(arr, callback) {
        var index = index;
        var loopArray = [];
        for(var i = 0; i < arr.length; i++) {
            var test = arr[i].childNodes;
            loopArray[loopArray.length] = Array.prototype.slice.call(test);

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
        for(var j = 0; j <= (item[counter].length - 1); j++) {
            if(counter % 2 !== 0) {
                item[counter][j].style.backgroundColor = "#523456";
            }
        }
    }

    function colorUpToSlash(item, counter) {
        for(var j = (item[counter].length - (counter + 1)); j >= 0; j--) {
            item[counter][j].style.backgroundColor = "#fff";

        }
    }

    function colorDown(item, counter) {
        for(var j = 0; j < (item.length - 1); j++) {
            //if(counter > 0) {
                item[counter + 1][j].style.backgroundColor = "#896123";
            //}
        }
    }

    function getBackSlash() {
        var loopArray = [];
        for(var i = 0; i < parentDivChildNodes.length; i++) {
            var test = parentDivChildNodes[i].childNodes;
            loopArray[loopArray.length] = Array.prototype.slice.call(test);
        }

        var i = 0;
        var j = 0;
        while(i < parentDivChildNodes.length && j < loopArray.length) {
            loopArray[i][j].style.backgroundColor = "#523456";
            j++;
            i++;
        }
    }

    function getSlash() {
        var loopArray = [];
        for(var i = 0; i < parentDivChildNodes.length; i++) {
            var test = parentDivChildNodes[i].childNodes;
            loopArray[loopArray.length] = Array.prototype.slice.call(test);
        }

        var i = 0;
        var j = (loopArray.length - 1);
        while (i < parentDivChildNodes.length && j >= 0) {
            loopArray[i][j].style.backgroundColor = "#ff0000"
            j--;
            i++;
        }
    }

    pushSpanElementToParentDiv();

    backSlash.addEventListener("click", function() {
        parentDiv.innerHTML = ""
        pushSpanElementToParentDiv();
        getBackSlash();
    });

    upSlash.addEventListener("click", function() {
        parentDiv.innerHTML = ""
        pushSpanElementToParentDiv();
        getSlash()
    });

    colorLines.addEventListener("click", function() {
        parentDiv.innerHTML = ""
        pushSpanElementToParentDiv();
        getAccessToDomElements(parentDivChildNodes, colorEvenLines);
    });

    colorUpSlash.addEventListener("click", function() {
        parentDiv.innerHTML = ""
        pushSpanElementToParentDiv();
        getAccessToDomElements(parentDivChildNodes, colorUpToSlash);
    });

    colorBackSlash.addEventListener("click", function() {
        parentDiv.innerHTML = ""
        pushSpanElementToParentDiv();
        getAccessToDomElements(parentDivChildNodes, colorDown);
    });

    chessTableEl.addEventListener("click", function() {
        parentDiv.innerHTML = ""
        pushSpanElementToParentDiv();
        getAccessToDomElements(parentDivChildNodes, chessTable);
    });

}())