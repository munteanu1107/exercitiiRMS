window.onload = (function() {
    var parentDiv;
    var slider;
    var indicator;
    var parentDivWidth;
    var parentDivHeight;
    var indicatorWidth;
    var indicatorHeight;
    var getIndicatorCoord;
    var getSliderCoord;

    var unit = "px";
    parentDivWidth = 500;
    parentDivHeight = 50;
    indicatorWidth = 16;
    indicatorHeight = indicatorWidth;
    parentDiv = document.getElementById("parent-div");
    slider = document.getElementsByClassName("slider")[0];
    indicator = document.getElementsByClassName("dot")[0];

    parentDiv.style.width = parentDivWidth + unit;
    parentDiv.style.height = parentDivHeight + unit;
    parentDiv.style.border = "1px solid black";
    parentDiv.style.position = "absolute";
    parentDiv.style.top = "15px";
    parentDiv.style.left = "15px";

    slider.style.position = "absolute";
    slider.style.width = parentDivWidth + unit;
    slider.style.height = 3 + unit;
    slider.style.backgroundColor = "#000";
    slider.style.top = (parentDivHeight / 2) + unit;

    indicator.style.position = "absolute";
    indicator.style.height = indicatorHeight + unit;
    indicator.style.width = indicatorWidth + unit;
    indicator.style.backgroundColor = "red";
    indicator.style.borderRadius = "50%";
    indicator.style.top = (parentDivHeight / 2) - (indicatorHeight / 2) + unit;

    getIndicatorCoord = indicator.getBoundingClientRect();
    getSliderCoord = slider.getBoundingClientRect();

    var minVal = 0;
    var maxVal = 10;
    var currentPos = 0;
    var currentVal = 0;
    var initialxPos = getIndicatorCoord.x;


    function dragIndicatorOnClick(e) {
        var newXpos = (e.clientX - (indicatorWidth / 2)) - initialxPos;
        keepRightLimit(newXpos);
    }

    function dragElement(e) {
        e.preventDefault();

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);

        function onMouseMove(e) {
            var newXpos = (e.clientX - (indicatorWidth / 2)) - initialxPos;

            if(newXpos < 0) {
                newXpos = 0;
            }

            if(newXpos > parentDivWidth - 16) {
                newXpos = parentDivWidth - indicatorWidth;
            }
            keepRightLimit(newXpos)

        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

    }

    function keepRightLimit(newPos) {
        if(newPos < 0) {
            newPos = 0;
            indicator.style.left = newPos + unit;
            currentPos = Math.round((newPos * 100) / (getSliderCoord.width - indicatorWidth));
            currentVal = (currentPos * maxVal) / 100;

            console.log(currentPos + "%");
            console.log(currentVal);
        }

        if(newPos > (parentDivWidth - indicatorWidth)) {
            newPos = parentDivWidth - indicatorWidth;
            indicator.style.left = newPos + unit;
            currentPos = Math.round((newPos * 100) / (getSliderCoord.width - indicatorWidth));
            currentVal = (currentPos * maxVal) / 100;
            console.log(currentPos + "%");
            console.log(currentVal);
        }

        indicator.style.left = newPos + unit;
        currentPos = Math.round((newPos * 100) / (getSliderCoord.width - indicatorWidth));
        currentVal = (currentPos * maxVal) / 100;
        console.log(currentPos + "%");
        console.log(currentVal);
    }

    slider.addEventListener("click", function(e) {
        dragIndicatorOnClick(e)
    });

    indicator.addEventListener("mousedown", function(e) {
        dragElement(e)
    });
}());