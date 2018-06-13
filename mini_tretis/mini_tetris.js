window.onload = (function(){
    var container;
    var containerDivPosX;
    var containerDivPosY;
    var matrix = [];

    var cols = 7;
    var lines = 15;
    var el = 30;
    var distance = 4;
    var score = 0;
    var width = cols * (el + distance) + distance;
    var height = lines * (el + distance) + distance;
    var unit = "px";
    var step = 0;
    var centerLine = Math.floor(cols / 2);
    var checkNextLevel = 0;
    var pause = false;
    var speedTime = 150;

    containerPosX = 50;
    containerPosY = 50;
    container = document.getElementById("container");
    container.style.height = height + unit;
    container.style.width = width + unit;
    container.style.position = "absolute";
    container.style.left = containerPosX + unit;
    container.style.top = containerPosY + unit;
    container.style.border = "1px solid black";

    var displayScore = document.getElementById("result");

    function generateDivElement(element) {
        var childDiv;
        var generateId = 1;

        var xPos = 4;
        var yPos = 4;
        for (var i = 0; i < lines; i++) {
            matrix[i] = [];
            xPos = 4;
            for (var j = 0; j < cols; j++) {
                childDiv = document.createElement("div");
                childDiv.id = generateId;
                childDiv.style.height = el + unit;
                childDiv.style.width = el + unit;
                childDiv.style.position = "absolute";
                childDiv.style.left = xPos + unit;
                childDiv.style.top = yPos + unit;

                generateId++;

                matrix[i][j] = childDiv;

                xPos += el + distance;
                element.appendChild(childDiv);
            }

            yPos += el + distance;
        }

        return matrix;
    }

    generateDivElement(container);

    function loopTetris() {
        var array = matrix;
        if(step == lines || array[step][centerLine].className === "black") {
            step = 0;
            centerLine = Math.floor(cols / 2);
        }

        if(step > 0) {
            array[step - 1][centerLine].removeAttribute("class");
        }

        document.getElementById(array[step][centerLine].id).className = "black";
        gameOver();

        step++;
        nextLevel();
    }

    var timeOut = setInterval(loopTetris, speedTime);

    window.addEventListener("keydown", OnKeyPress, false);

    function OnKeyPress(event) {

        switch(event.code) {
            case "ArrowLeft":
                moveElementToTheLeft();
                break;
            case "ArrowRight":
                moveElementToTheRight();
                break;
            case "Space":
                if(!pause) {
                    pause = true;
                    pauseGame(pause);
                } else {
                    pause = false;
                    pauseGame(pause);
                }
                break;
        }
    }

    function moveElementToTheLeft() {
        if(centerLine > 0) {
            if(matrix[step-1][centerLine-1].className !== "black" && step < lines) {
                matrix[step-1][centerLine].removeAttribute("class");
                centerLine--;
            }
        }
    }

    function moveElementToTheRight() {
        if(centerLine < (cols-1)) {
            if(!matrix[step-1][centerLine+1].className && step < lines) {
                matrix[step - 1][centerLine].removeAttribute("class");
                centerLine++;
            }
        }
    }

    function pauseGame(p) {
        if(p) {
            clearInterval(timeOut);
        } else {
            timeOut = setInterval(loopTetris, speedTime);
        }
    }

    function nextLevel() {

        if(step === lines) {
            var x = matrix[lines-1].length;

            while(x > 0) {
                if(matrix[lines-1][x-1].className == "black") {
                    checkNextLevel++;

                    if(checkNextLevel === cols) {
                        checkNextLevel = 0;
                        score++;
                        repaintElements(matrix);
                        showScore(score);
                    }
                };

                x--;
            }
            checkNextLevel = 0;
        }
    }

    function showScore(score) {
        displayScore.innerHTML = "Your score: " + score;
    }

    function repaintElements() {
        for(var i = (matrix.length - 1); i > 0; i--) {
            for(var j = 0; j < matrix[i].length; j++) {
                if(matrix[i][j].className === "black" && i !== lines-1) {
                    matrix[i][j].removeAttribute("class");
                    matrix[i+1][j].className = "black";
                } else {
                    matrix[i][j].removeAttribute("class");
                }
            }
        }
    }

    function gameOver() {
        if(matrix[1][centerLine].className === "black" && matrix[0][centerLine].className === "black") {
            container.innerHTML = "";
            score = 0;
            displayScore.innerHTML = "Your score: " + score;
            generateDivElement(container);
        }
    }
}());