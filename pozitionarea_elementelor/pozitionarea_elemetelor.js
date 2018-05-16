window.onload = (function() {
    var parentDiv = document.getElementById("parent-div")
    var parentDivWidth = "400px";
    var parentDivHeight = parentDivWidth;
    var parentDivBackgroundColor = "#f1f1f1"
    var parentDivBorder = "1px solid #000000"

    parentDiv.style.width = parentDivWidth;
    parentDiv.style.height = parentDivHeight;
    parentDiv.style.backgroundColor = parentDivBackgroundColor;
    parentDiv.style.border = parentDivBorder;


    function generateChildDiv() {
        var childDiv = document.createElement("div");
        childDiv.style.backgroundColor = "#000000"
    }
}())