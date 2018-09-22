
    var containerEl;
    var screenWidth;
    var screenHeight;
    var containerWidth;
    var containerHeight;
    var yPos;
    var xPos;
    var unit = "px";
    var azzureColore;
    var speed;
    var i = 0;

    containerEl = document.getElementsByClassName("element-pulsatoriu")[0];
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    containerWidth = 200;
    containerHeight = 200;
    yPos = (screenHeight / 2) - (containerHeight /2);
    xPos = (screenWidth / 2) - (containerWidth /2);
    azzureColore = "#007FFF";

    containerEl.style.width = containerWidth + unit;
    containerEl.style.height = containerHeight + unit;
    containerEl.style.position = "absolute";
    containerEl.style.top = yPos + unit;
    containerEl.style.left = xPos + unit;
    containerEl.style.borderRadius = "50%";
    containerEl.style.backgroundColor = azzureColore;

    window.onload = function() {
        speed = .1;
        function animate() {
                var currentOscillation = Math.abs(Math.sin(i).toPrecision(2));
                currentOscillation = currentOscillation < .2 ? 0 : currentOscillation;
                console.log(100 * currentOscillation);
                containerEl.style.width = containerWidth + (100 * currentOscillation) + unit;
                containerEl.style.height = containerHeight + (100 * currentOscillation) + unit;
                containerEl.style.marginLeft = -1 * (50 * currentOscillation) + unit;
                containerEl.style.marginTop = -1 * (50 * currentOscillation) + unit;
                i += speed;
                window.requestAnimationFrame(animate);

        }

        window.requestAnimationFrame(animate);
    }
