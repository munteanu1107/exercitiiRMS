window.onload = (function() {
    var container;
    var base;
    var tower;
    var disk;

    var conatinerHeight;
    var containerWidth;
    var baseHeight;
    var baseWidth;
    var towerHeight;
    var towerWidth;
    var diskHeight;
    var diskWidth;
    var towerLeftPos;

    var stackA = [];
    var stackB = [];
    var stackC = [];
    var generateId = 0;
    var numbersOfTowers = 3;
    var numbersOfDisks = 6;
    var containerLeftPos = 200;
    var unit = "px";
    conatinerHeight = 700;
    containerWidth = 1500;
    baseWidth = containerWidth;
    baseHeight = 50;
    towerWidth = baseHeight;
    towerHeight = 400;
    towerLeftPos = 150;
    diskHeight = 60;
    diskWidth = (towerLeftPos * 2);
    diskLeftPos = (diskWidth / 2) - (towerWidth / 2);
    diskBottomPos = 0;

    container = document.getElementById("container");
    base = document.createElement("div");

    container.style.height = conatinerHeight + unit;
    container.style.width = containerWidth + unit;
    container.style.position = "absolute";
    container.style.left = containerLeftPos + unit;

    base.style.width = baseWidth + unit;
    base.style.height = baseHeight + unit;
    base.style.position = "absolute";
    base.style.bottom = "0" + unit;
    base.style.backgroundColor = "indianred";
    base.style.borderRadius = 10 + unit;

    createTowers(numbersOfTowers);

    container.appendChild(base);
    generateId = 0;
    createDisks(numbersOfDisks, document.getElementById("1"));

    function createTowers(no) {
        if(no === 0) {
            return;
        }
        generateId++
        tower = document.createElement("div");
        tower.id = generateId;
        tower.style.width = towerWidth + unit;
        tower.style.height = towerHeight + unit;
        tower.style.position = "absolute";
        tower.style.bottom = baseHeight + unit;
        tower.style.left = towerLeftPos + unit;
        tower.style.backgroundColor = "cadetblue";
        tower.style.borderRadius = 10 + unit;

        towerLeftPos += (containerWidth / numbersOfTowers) + towerWidth;
        base.appendChild(tower);

        createTowers(no - 1);
    }

    function createDisks(n, appendToTower) {
        if(n === 0) {
            return;
        }
        disk = document.createElement("div");
        disk.className = n;
        disk.style.position = "absolute";
        disk.style.width = diskWidth + unit;
        disk.style.height = diskHeight + unit;
        disk.style.backgroundColor = "#" + Math.round(Math.random() * 0xaaabbb).toString(16);
        disk.style.borderRadius = 10 + unit;
        disk.style.left = (Math.abs(diskLeftPos) * -1) + unit;
        disk.style.bottom = diskBottomPos + unit;
        diskWidth -= towerWidth;
        diskLeftPos -= (towerWidth / 2);
        diskBottomPos += diskHeight;
        appendToTower.appendChild(disk);
        stackA.push(n);

        return createDisks(n - 1, document.getElementById("1"));
    }

    function draw(arr, element) {
        var el;
        for(var i = 0; i < arr.length; i++) {
            if(!arr[i]) {
                return
            } else {
                el = document.getElementsByClassName(arr[i])[0];
                el.style.bottom = (diskHeight * i) + unit;
                element.appendChild(el);
            }
        }
    }

    var timmer = 1;

    function drawStepByStep(a,b,c) {

        timmer++

        (function f(a,b,c) {
            var a2 = JSON.parse(JSON.stringify(a));
            var b2 = JSON.parse(JSON.stringify(b));
            var c2 = JSON.parse(JSON.stringify(c));
            setTimeout(function () {
                draw(a2, document.getElementById("1"));
                draw(b2, document.getElementById("2"));
                draw(c2, document.getElementById("3"));
            }, timmer * 500);
        })(a,b,c);
    }

    function hanoi(disc, src, dest, aux) {
        if(disc === 1) {
            dest.push(src.pop());
            drawStepByStep(stackA, stackB, stackC)

            return;
        }

            hanoi(disc -1,src , aux, dest);
            dest.push(src.pop());

            drawStepByStep(stackA, stackB, stackC)

            hanoi(disc -1, aux, dest, src);

    };
    hanoi(numbersOfDisks, stackA, stackB, stackC);

}());