window.onload = (function(){
    var container;
    var center;
    var hours;
    var minutes;
    var seconds;
    var indicators;
    var hoursArray;

    var unit = "px";
    var containerHeight = 400;
    var containerWidth = containerHeight;
    var containerTop = 100;
    var containerLeft = containerTop;
    var hourWidth = 5;

    // Get Elements From DOM
    container = document.getElementById("container");
    center = document.getElementById("center");
    hours = document.getElementById("hours");
    minutes = document.getElementById("minutes");
    seconds = document.getElementById("seconds");

    // Add Style To Elements
    container.style.position = "absolute";
    container.style.top = containerTop + unit;
    container.style.left = containerLeft + unit;
    container.style.height = containerHeight + unit;
    container.style.width = containerWidth + unit;

    center.style.position = "absolute";
    center.style.top = (containerHeight / 2) - hourWidth + unit;
    center.style.left = (containerWidth / 2) - hourWidth + unit
    center.style.height = "10px";
    center.style.width = "10px";
    center.style.borderRadius = "50%";
    center.style.backgroundColor = "black";
    center.style.transformOrigin = "bottom";
    center.style.zIndex = "-1px";
    center.style.transform = "rotate(0deg)";


    hours.style.position = "absolute";
    hours.style.top = 5 + unit;
    hours.style.left = 5 + unit;
    hours.style.width = "100px";
    hours.style.height = "1.5px";
    hours.style.backgroundColor = "red";
    hours.style.transformOrigin = "top left";
    hours.style.transform = "rotate(-90deg)";

    minutes.style.position = "absolute";
    minutes.style.top = 5 + unit;
    minutes.style.left = 5 + unit;
    minutes.style.width = "150px";
    minutes.style.height = "1.5px";
    minutes.style.backgroundColor = "blue";
    minutes.style.transformOrigin = "top left";
    minutes.style.transform = "rotate(-90deg)";

    seconds.style.position = "absolute";
    seconds.style.top = 5 + unit;
    seconds.style.left = 5 + unit;
    seconds.style.width = "180px";
    seconds.style.height = "1px";
    seconds.style.backgroundColor = "green";
    seconds.style.transformOrigin = "top left";
    seconds.style.transform = "rotate(-90deg)";

    hoursArray = [];

    createHoursNumber()
    distributeHours(hoursArray);
    // moveIndicators();
    moveIndicatorsSetTimeout();

    // Create Indicators Clock
    function createHoursNumber() {
        var numbersOfH = 12;
        var h;
        for(var i = 1; i <= numbersOfH; i++) {
            h = document.createElement("div");
            h.innerHTML = i;
            h.className = "hours";
            hoursArray[hoursArray.length] = h;
            container.appendChild(h)
        }

        return h;
    }

    // Display hours
    function distributeHours(array) {
        var radius = (containerWidth / 2);
        var angle = ((360 / 12) * (Math.PI / 2)) / 90 - (Math.PI / 2);
        var step = (2 * Math.PI) / array.length;
        var xPos = 0;
        var yPos = 0;
        var hWidth = hourWidth;

        for(var i = 0; i < array.length; i++) {
            xPos = Math.round((containerWidth / 2) + (radius * Math.cos(angle)) - (hWidth / 2));
            yPos = Math.round((containerHeight / 2) + (radius * Math.sin(angle)) - (hWidth / 2));

            array[i].style.left = xPos + unit;
            array[i].style.top = yPos + unit;

            angle += step;
        }
    }

    // Move indicators
    function moveIndicators() {
        var secDeg;
        var minDeg;
        var hourDeg;
        setInterval(function() {
            var now = new Date();

            var hoursIndicator = hours;
            var minIndicator = minutes;
            var secIndicator = seconds;

            secDeg = -90 + (( now.getSeconds() + now.getMilliseconds() / 1000 ) / 60 * 360);
            minDeg = -90 + (now.getMinutes() / 60 * 360);
            hourDeg = -90 + (( now.getHours() + now.getMinutes() / 60 ) / 12 * 360);

            hoursIndicator.style.transform = "rotate(" + convertDegToRad(hourDeg) + "rad";
            minIndicator.style.transform = "rotate(" + convertDegToRad(minDeg) + "rad";
            secIndicator.style.transform = "rotate(" + convertDegToRad(secDeg) + "rad";

          }, 1000);
    }

    function moveIndicatorsSetTimeout() {
        var secDeg;
        var minDeg;
        var hourDeg;
        var now = new Date();

        var hoursIndicator = hours;
        var minIndicator = minutes;
        var secIndicator = seconds;

        secDeg = -90 + (( now.getSeconds() + now.getMilliseconds() / 1000 ) / 60 * 360);
        minDeg = -90 + (now.getMinutes() / 60 * 360);
        hourDeg = -90 + (( now.getHours() + now.getMinutes() / 60 ) / 12 * 360);

        hoursIndicator.style.transform = "rotate(" + convertDegToRad(hourDeg) + "rad";
        minIndicator.style.transform = "rotate(" + convertDegToRad(minDeg) + "rad";
        secIndicator.style.transform = "rotate(" + convertDegToRad(secDeg) + "rad";

        var timeOut = setTimeout(moveIndicatorsSetTimeout, 1000);
    }

    function convertDegToRad(degrees) {
        return degrees * Math.PI / 180;
    }

    function convertRadToDeg(degrees) {
        return degrees * Math.PI / 180;
    }

}())