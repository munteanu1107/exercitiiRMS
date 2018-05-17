window.onload = (function() {
    var cols = 12;
    var lines = cols;
    var el = 20;
    var distance = 4;
    debugger;

    var parentDiv;
    var width = cols * (el + distance);
    var height = lines * (el + distance);


    parentDiv = document.getElementById("absolute-order");
    parentDiv.style.height = height + "px";
    parentDiv.style.width = width + "px";
    parentDiv.style.border = "1px solid #000";

    function generateDivElement() {
        var childDiv;
        var matrixOfElements = [];

        for(var i = 0; i < lines; i++) {

            matrixOfElements[i] = [];

            for(var j = 0; j <= cols; j++) {
                childDiv = document.createElement("div");

                childDiv.style.height = el + "px";
                childDiv.style.width = el + "px";
                childDiv.style.backgroundColor = "red";
                childDiv.style.display = "inline-block";
                childDiv.style.marginLeft = distance + "px"

                matrixOfElements[i][j] = childDiv;
                parentDiv.appendChild(childDiv);
            }
        }

        console.table(matrixOfElements)
    }

    generateDivElement();
}())



// var x = [];

//     for (var i = 0; i < 10; i++) {
//         x[i] = [];

//         for (var j = 0; j < 10; j++) {
//             x[i][j] = "" + i + j;
//         }
//     }
// console.table(x);
