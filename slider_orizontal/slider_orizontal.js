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

    var minVal = 20;
    var maxVal = 60;
    var keepMin = 0;
    var defaultVal = 0;
    var currentPos = 0;
    var calculateCurrentVal = 0;
    var currentVal = 0;
    var initialxPos = getIndicatorCoord.x;

    if(minVal < 0) {
        keepMin = minVal;
        maxVal = maxVal + Math.abs(minVal);
        minVal = 0;
    }
    // setValue(25);


    function dragIndicatorOnClick(e) {
        var newXpos = (e.clientX - (indicatorWidth / 2)) - initialxPos;
        keepRightLimit(newXpos);
    }

    function dragElement(e) {
        e.preventDefault();

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        onMouseMove(event);
        function onMouseMove(event) {
            var newXpos = (event.clientX - (indicatorWidth / 2)) - initialxPos;

            if(newXpos < minVal) {
                newXpos = 0;
            }

            if(newXpos > parentDivWidth - initialxPos) {
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
        indicator.style.left = newPos + unit;
        currentPos =Math.round((newPos * 100) / (getSliderCoord.width - indicatorWidth));
        calculateCurrentVal = Math.round(keepMin + ((maxVal - minVal) * currentPos) / 100);
        currentVal = calculateCurrentVal + minVal
        console.log(currentPos + "%");
        console.log(currentVal);
    }

    // setValue(maxVal);
    setValue(45);

    function setValue(val) {
        if(maxVal < val) {
            val = maxVal;
        }

        // IMPORTANT
        if(val <= maxVal && val > 0) {
            var removeMinVal = maxVal - minVal;
            var percent = Math.round((val-minVal) * 100 / removeMinVal);
            var pozMax = getSliderCoord.width - indicatorWidth;
            var newPoz = percent * pozMax / 100;
        }

        indicator.style.left = newPoz + unit;
    }

    slider.addEventListener("click", dragIndicatorOnClick);

    indicator.addEventListener("mousedown", dragElement);

    //     var a = minVal;
    //     var t = setInterval(function() {
    //     setValue(a);
    //     if (a <= maxVal) {
    //         //console.log(a)
    //         a++;
    //     } else {
    //         clearInterval(t);
    //     }

    // }, 16);
}());