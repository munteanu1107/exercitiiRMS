function CreateNode() {}

CreateNode.prototype = {
    constructor: CreateNode,

    createNode: function(el, attr) {
        el = document.createElementNS("http://www.w3.org/2000/svg", el);

        for (var key in attr) {
            el.setAttributeNS(
                null,
                key.replace(/[A-Z]/g,
                function(item) {
                    return "-" + item.toLowerCase();
                }), attr[key]
            );
        }

        return el;
    },

    createGroupNode: function(append, attrs) {
        append = document.getElementById(append);
        var mainGroup = this.createNode("g", attrs);

        return append.appendChild(mainGroup);
    },

    createTextNode: function(append, attrs) {
        append = document.getElementById(append);
        var textNode = this.createNode("text", attrs);

        return append.appendChild(textNode);
    },

    createRectNode: function(append, attrs) {
        append = document.getElementById(append);
        var rect = this.createNode("rect", attrs);

        return append.appendChild(rect);
    },

    createLineNode: function(append, attrs) {
        append = document.getElementById(append);
        var line = this.createNode("line", attrs);

        return append.appendChild(line);
    },

    getParent: function() {
        return this.svg;
    }

}


function Board() {}

Board.prototype = {
    constructor: Board,

    initBoard: function(parentId) {
        this.parent = document.getElementById(parentId);
        this.svg = this.createNode("svg", {
            id: "mainSvg",
            width: 1500,
            height: 1000
        });

        return this.parent.appendChild(this.svg);
    }
};

Object.assign(Board.prototype, CreateNode.prototype);


function CustomEvents() { };
CustomEvents.prototype = {

    constructor: CustomEvents,

    addListener: function(type, listener) {

        if (!this.hasOwnProperty("_listeners")) {
            this._listeners = [];
        }

        if (typeof this._listeners[type] == "undefined") {
            this._listeners[type] = [];
        }

        this._listeners[type].push(listener);
    },

    fire: function(event) {
        if (!event.target) {
            event.target = this;
        }

        if (!event.type){
            throw new Error("Event object missing 'type' property.");
        }

        if (this._listeners && this._listeners[event.type] instanceof Array) {
            var listeners = this._listeners[event.type];
            for (var i=0, len=listeners.length; i < len; i++) {
                listeners[i].call(this, event);
            }
        }
    },
    removeListener: function(type, listener) {
        if (this._listeners && this._listeners[type] instanceof Array){
            var listeners = this._listeners[type];
            for (var i=0, len=listeners.length; i < len; i++){
                 if (listeners[i] === listener){
                     listeners.splice(i, 1);
                     break;
                 }
            }
        }
    }
}

function DragAndDrop() {

}

DragAndDrop.prototype = {

    constructor: DragAndDrop,

    initDrag: function() {
        this.mouseDownHandler = this.mouseDown.bind(this);
        this.mouseMoveHandler = this.onMouseMove.bind(this);
        this.onMouseUpHandler = this.onMouseUp.bind(this);

        this.element.addEventListener("mousedown", this.mouseDownHandler);
    },

    mouseDown: function(e) {
        this.startDrag(e);

        document.addEventListener("mousemove", this.mouseMoveHandler);
        document.addEventListener("mouseup", this.onMouseUpHandler);
    },

    onMouseMove: function(e) {
        this.mouseMove(e);
    },

    onMouseUp: function(e) {
        document.removeEventListener("mouseup", this.onMouseUpHandler);
        document.removeEventListener("mousemove", this.mouseMoveHandler);
        this.stopDrag(e);
    },

    startDrag: function() {
        throw("this function must be overwritten");
    },

    mouseMove: function() {
        throw("this function must be overwritten");
    },

    stopDrag: function() {
        throw("this function must be overwritten");
    }
};




function Resize() {};

Resize.prototype = Object.create(CustomEvents.prototype);

Object.assign(Resize.prototype, {
    constructor: Resize,

    initResize: function(element) {
        this.resizableElement = element;
        var mainRow = this.resizableElement.getBBox();

        this.removeResizableRect(element);

        // Handlers
        this.resizePointStartDragHandler = this.resizePointStartDrag.bind(this);
        this.pointerMoveHandler = this.mouseMovePointer.bind(this);
        this.stopResizeHandler = this.stopResize.bind(this);

        this.resizableGroup = this.createGroupNode(this.row.id, {
            id: "resizeGroup"
        });

        this.resizableRow = this.createRectNode(this.resizableGroup.id, {
            id: "resize",
            width: mainRow.width,
            height: mainRow.height,
            x: mainRow.x,
            y: mainRow.y,
            fill: "none",
            stroke: "black",
            style: "visibility: hidden"
        });

        this.pointersGroup = this.createGroupNode(this.resizableGroup.id, {
            id: "pointersGroup"
        });

        var points = [];

        for(var i = 0; i < 8; i++) {
            var point = new Point(this.pointersGroup.id, 10);
            point.addListener("startDrag", this.resizePointStartDragHandler);
            point.addListener("pointerMove", this.pointerMoveHandler);
            point.addListener("stopResize", this.stopResizeHandler);

            points.push(point)
        }

        this.leftPoint = points[0];
        this.topPoint = points[1];
        this.rightPoint = points[2];
        this.bottomPoint = points[3];
        //
        this.topLeftPoint = points[4];
        this.topRightPoint = points[5];
        this.bottomLeftPoint = points[6];
        this.bottomRightPoint = points[7];

        this.leftPoint.initResizePoint();
        this.topPoint.initResizePoint();
        this.rightPoint.initResizePoint();
        this.bottomPoint.initResizePoint();
        //
        this.topLeftPoint.initResizePoint();
        this.topRightPoint.initResizePoint();
        this.bottomLeftPoint.initResizePoint();
        this.bottomRightPoint.initResizePoint();

        this.leftPoint.configResizePoint({
            id: "leftPoint",
            width: 10,
            height: 10,
            style: "cursor: e-resize; visibility: hidden"
        });

        this.topPoint.configResizePoint({
            id: "topPoint",
            width: 10,
            height: 10,
            style: "cursor: n-resize; visibility: hidden"
        });

        this.rightPoint.configResizePoint({
            id: "rightPoint",
            width: 10,
            height: 10,
            style: "cursor: e-resize; visibility: hidden"
        });

        this.bottomPoint.configResizePoint({
            id: "bottomPoint",
            width: 10,
            height: 10,
            style: "cursor: n-resize; visibility: hidden"
        });
        ////////////////

        this.topLeftPoint.configResizePoint({
            id: "topLeftPoint",
            width: 10,
            height: 10,
            style: "cursor: nw-resize; visibility: hidden"
        });

        this.topRightPoint.configResizePoint({
            id: "topRightPoint",
            width: 10,
            height: 10,
            style: "cursor: ne-resize; visibility: hidden"
        });

        this.bottomLeftPoint.configResizePoint({
            id: "bottomLeftPoint",
            width: 10,
            height: 10,
            style: "cursor: ne-resize; visibility: hidden"
        });

        this.bottomRightPoint.configResizePoint({
            id: "bottomRightPoint",
            width: 10,
            height: 10,
            style: "cursor: nw-resize; visibility: hidden"
        });

        this.updateResisablePoints(this.resizableElement);
    },

    resizePointStartDrag: function(data) {
        this.currentPoint = data.el;
        this.currentShape = data.element;
        this.currentPointBBox = data.el.getBBox();
        this.shapeBBox = this.element.getBBox();
    },

    updateResisablePoints: function(element) {
        var mainRow = element.getBBox();

        var leftXpos = mainRow.x - (this.leftPoint._pointerWidth / 2);
        var leftYpos = mainRow.y + (mainRow.height / 2) - (this.leftPoint._pointerWidth / 2);

        var rightXpos = mainRow.x + mainRow.width - (this.rightPoint._pointerWidth / 2);
        var rightYpos = mainRow.y + (mainRow.height / 2) - (this.rightPoint._pointerWidth / 2);

        var topXpos = mainRow.x + (mainRow.width / 2) - (this.topPoint._pointerWidth / 2);
        var topYpos = mainRow.y - (this.topPoint._pointerWidth / 2);

        var bottomXpos = mainRow.x + (mainRow.width / 2) - (this.bottomPoint._pointerWidth / 2);
        var bottomYpos = mainRow.y + mainRow.height - (this.bottomPoint._pointerWidth / 2);

        var leftTopXpos = mainRow.x - (this.rightPoint._pointerWidth / 2);
        var leftTopYpos = mainRow.y - (this.rightPoint._pointerWidth / 2);

        var rightTopXpos = mainRow.x + mainRow.width - (this.rightPoint._pointerWidth / 2);
        var rightTopYpos = mainRow.y - (this.rightPoint._pointerWidth / 2);

        var leftBottomXpos = mainRow.x - (this.rightPoint._pointerWidth / 2);
        var leftBottomYpos = mainRow.y + mainRow.height - (this.topPoint._pointerWidth / 2);

        var rightBottomXpos = mainRow.x + mainRow.width - (this.bottomPoint._pointerWidth / 2);
        var rightBottomYpos = mainRow.y + mainRow.height - (this.bottomPoint._pointerWidth / 2);

        this.bottomPoint.setResizablePosition(bottomXpos, bottomYpos);
        this.topPoint.setResizablePosition(topXpos, topYpos);
        this.leftPoint.setResizablePosition(leftXpos, leftYpos);
        this.rightPoint.setResizablePosition(rightXpos, rightYpos);
        this.topLeftPoint.setResizablePosition(leftTopXpos, leftTopYpos);
        this.topRightPoint.setResizablePosition(rightTopXpos, rightTopYpos);
        this.bottomLeftPoint.setResizablePosition(leftBottomXpos, leftBottomYpos);
        this.bottomRightPoint.setResizablePosition(rightBottomXpos, rightBottomYpos);

        var i = this._resizablePoints.length;

        if(this._resizable) {
            this.resizableRow.style.visibility = "visible";

            while(i >= 0) {
                switch(this._resizablePoints[i]) {
                    case "top":
                        this.topPoint.element.style.visibility = "visible";
                        break;
                    case "left":
                        this.leftPoint.element.style.visibility = "visible";
                        break;
                    case "right":
                        this.rightPoint.element.style.visibility = "visible";
                        break;
                    case "bottom":
                        this.bottomPoint.element.style.visibility = "visible";
                        break;
                    case "topLeft":
                        this.topLeftPoint.element.style.visibility = "visible";
                        break;
                    case "topRight":
                        this.topRightPoint.element.style.visibility = "visible";
                        break;
                    case "bottomLeft":
                        this.bottomLeftPoint.element.style.visibility = "visible";
                        break;
                    case "bottomRight":
                        this.bottomRightPoint.element.style.visibility = "visible";
                        break;
                }
                --i;
            }
        }
    },

    mouseMovePointer: function(data) {
        switch (data.data.el.id) {
            case "rightPoint":
                this.resizeRight(data);
                break;
            case "leftPoint":
                this.resizeLeft(data);
                break;
            case "topPoint":
                this.resizeTop(data);
                break;
            case "bottomPoint":
                this.resizeBottom(data);
                break;
            case "topLeftPoint":
                this.resizeTopLeft(data);
                break;
            case "topRightPoint":
                this.resizeTopRight(data);
                break;
            case "bottomLeftPoint":
                this.resizeBottomLeft(data);
                break;
            case "bottomRightPoint":
                this.resizeBottomRight(data);
                break;
        }
    },

    setResizableWidth: function(val) {
        this.resizableRow.setAttribute("width", val);
    },

    setResizableHeight: function(val) {
        this.resizableRow.setAttribute("height", val);
    },

    getResizableHeight: function() {
        return parseInt(this.resizableRow.getAttribute("height"));
    },

    setResizableXpos: function(val) {
        this.resizableRow.setAttribute("x", val);
    },

    setResizableYpos: function(val) {
        this.resizableRow.setAttribute("y", val);
    },

    resizeRight: function(data) {
        var initX = this.currentPointBBox.x + (this.currentPointBBox.width / 2);
        var initWidth = this.shapeBBox.width;
        var currentX = data.data.mouseEvent.clientX;
        var deltaX = currentX - initX;
        var newWidth = initWidth + deltaX - (this.currentPointBBox.width / 2);
        var limit = this.leftPoint.element.getBBox().x + (this.currentPointBBox.width * 2);

        if(currentX > limit) {
            this.setResizableWidth(newWidth);
            this.setShapeWidth(newWidth);
            this.updateResisablePoints(this.resizableRow);
        }
    },

    resizeLeft: function(data) {
        var initX = this.currentPointBBox.x + (this.currentPointBBox.width / 2);
        var initWidth = this.shapeBBox.width;
        var currentX = data.data.mouseEvent.clientX;
        var deltaX = currentX - initX;
        var newWidth = initWidth - deltaX + (this.currentPointBBox.width / 2);
        var newX = initX + deltaX - (this.currentPointBBox.width / 2);
        var limit = this.rightPoint.element.getBBox().x;

        if(currentX < limit) {
            this.setResizableWidth(newWidth);
            this.setShapeWidth(newWidth);
            this.setShapeXpos(newX);
            this.setResizableXpos(newX);
            this.updateResisablePoints(this.resizableRow);
        }
    },

    resizeBottom: function(data) {
        var initY = this.currentPointBBox.y;
        var initHeight = this.shapeBBox.height;
        var currentY = data.data.mouseEvent.clientY - (this.currentPointBBox.width / 2);
        var deltaY = currentY - initY;
        var newHeight = initHeight + deltaY - (this.currentPointBBox.width / 2);
        var limit = this.topPoint.element.getBBox().y + this.currentPointBBox.width;

        if(currentY > limit) {
            this.setResizableHeight(newHeight);
            this.setShapeHeight(newHeight);
            this.updateResisablePoints(this.resizableRow);
        }
    },

    resizeTop: function(data) {
        var initY = this.currentPointBBox.y;
        var initHeight = this.shapeBBox.height;
        var currentY = data.data.mouseEvent.clientY - (this.currentPointBBox.width / 2);
        var deltaY = currentY - initY;
        var newHeight = initHeight - deltaY + (this.currentPointBBox.width / 2);
        var newY = initY + deltaY;
        var limit = this.bottomPoint.element.getBBox().y;

        if(currentY < limit) {
            this.setResizableHeight(newHeight);
            this.setShapeHeight(newHeight);
            this.setShapeYpos(newY);
            this.setResizableYpos(newY);
            this.updateResisablePoints(this.resizableRow);
        }
    },

    resizeTopLeft: function(data) {
        this.resizeTop(data);
        this.resizeLeft(data);

        this.updateResisablePoints(this.resizableRow);
    },

    resizeTopRight: function(data) {
        this.resizeTop(data);
        this.resizeRight(data);

        this.updateResisablePoints(this.resizableRow);
    },

    resizeBottomLeft: function(data) {
        this.resizeBottom(data);
        this.resizeLeft(data);

        this.updateResisablePoints(this.resizableRow);
    },

    resizeBottomRight: function(data) {
        this.resizeBottom(data);
        this.resizeRight(data);

        this.updateResisablePoints(this.resizableRow);
    },

    removeResizableRect: function(el) {
        var childs = el.childNodes;
        var domEl = document.getElementById("resizeGroup");

        childs.forEach(element => {
           if (element.id === "resizeGroup") {
               element.remove();
           }
        });

        if(domEl) {
            domEl.remove();
        }
    },

    stopResize: function(evt) {
        this.fire({type:"resized", data: evt});
    }
});

function Point(parent, width) {
    this._parent = parent;
    this._pointerWidth = width;
}

Point.prototype = Object.create(CustomEvents.prototype);

Object.assign(Point.prototype, DragAndDrop.prototype, {
    constructor: Point,

    initResizePoint: function() {
        this.initialised = true;
        this.element = this.createRectNode(this._parent);

        this.initDrag();

        this.startDrag = function(evt) {
            this.fire({type: "startDrag", el: this.element});
        };

        this.mouseMove = function(evt) {
            this.fire({type: "pointerMove", data: { el: this.element, mouseEvent: evt}});
        };

        this.stopDrag = function(evt) {
            this.fire({ type: "stopResize", data: { el: this.element, mouseEvent: evt}});
        };

        return this.element;
    },

    setResizablePosition: function(x, y) {
            this.element.setAttribute("x", x);
            this.element.setAttribute("y", y);
    },

    configResizePoint: function(config) {
            for (var key in config) {
                this.element.setAttributeNS(
                    null,
                    key.replace(/[A-Z]/g,
                        function (item) {
                            return "-" + item.toLowerCase();
                        }), config[key]
                );
            };
    },

    createRectNode: function (append, attrs) {
        append = document.getElementById(append);
        var rect = this.createNode("rect", attrs);

        return append.appendChild(rect);
    },

    createNode: function (el, attr) {
        el = document.createElementNS("http://www.w3.org/2000/svg", el);

        for (var key in attr) {
            el.setAttributeNS(
                null,
                key.replace(/[A-Z]/g,
                    function (item) {
                        return "-" + item.toLowerCase();
                    }), attr[key]
            );
        }
        return el;
    }
});


function Shape(width, height, x, y, distance, index, resizable, resizablePoints) {
    this._width = width;
    this._height = height;
    this._xPos = x;
    this._yPos = y;
    this._distance = distance;
    this._index = index;
    this._resizable = resizable;
    this._resizablePoints = resizablePoints;
};

Shape.prototype = Object.create(CustomEvents.prototype);

Object.assign(Shape.prototype, CreateNode.prototype, DragAndDrop.prototype, Resize.prototype, {
    constructor: Shape,

    render: function() {

        this.row = this.createGroupNode("mainGroup", { id: "row" + this._index });

        this.element = this.createRectNode("row" + this._index, {
            id: this._index,
            width: this._width,
            height: this._height,
            x: this._xPos,
            y: this._yPos,
            fill: "#23abba"
        });

        this.element.style.cursor = "all-scroll";

        this.initDrag();

        this.startDrag = function(evt) {
            this.elementBoundingRect = evt.target.getBBox();

            this.shiftX = evt.clientX - this.elementBoundingRect.x;
            this.shiftY = evt.clientY - this.elementBoundingRect.y;

            evt.target.style.position = "absolute";
        };

        this.mouseMove = function(evt) {
            var yPos = evt.pageY - this.shiftY;
            this.setShapeYpos(yPos);

            if(this._resizable) {
                this.initResize(this.element, this._resizablePoints);
            }

            this.fire({type: "checkMousePos", data: evt});
        };

        this.stopDrag = function(evt) {
            this.fire({type: "dropShape", data: evt});
        }
    },

    setWidth: function(val) {
        this._width = val;
    },

    setHeight: function(val) {
        this._height = val;
    },

    setXpos: function(val) {
        this._xPos = val;
    },

    setYpos: function(val) {
        this._yPos = val;
    },

    getWidth: function() {
        return this._width;
    },

    getHeight: function() {
        return this._height;
    },

    getXpos: function() {
        return this._xPos;
    },

    getYpos: function() {
        return this._yPos;
    },

    getDistance: function() {
        return this._distance;
    },

    setDistance: function(val) {
        this._distance = val;
    },

    setShapeXpos: function(val) {
        this.setXpos(val);

        this.element.setAttribute("x", val);
    },

    setShapeYpos: function(val) {
        this.setYpos(val);

        this.element.setAttribute("y", val);
    },

    setShapeWidth: function(val) {
        this.setWidth(val);

        this.element.setAttribute("width", val);
    },

    setShapeHeight: function(val) {
        this.setHeight(val)

        this.element.setAttribute("height", val);
    },

    updateWidthConstant: function() {
        this._constWidth = this._width;
    }
});

function MainShape() {
    this.listOfShapes = [];
}

MainShape.prototype = Object.create(CustomEvents.prototype);

Object.assign(MainShape.prototype, Board.prototype, {
    constructor: MainShape,

    init: function (parent, startPos) {
        this.startPos = startPos;
        this.virtualBandHeight = this.startPos;
        this.id = 0;

        this.initBoard("main");

        this.mainGroup = this.createGroupNode(parent, {
            id: "mainGroup"
        });

        this.line = this.createLineNode("mainGroup", {
            id: "separator",
            x1: -9999,
            y1: -9999,
            x2: -9999,
            y2: -9999,
            stroke: "red"
        });
    },

    createShape: function(config) {
        var shape = new Shape(config.width, config.height, config.x, this.virtualBandHeight, config.distance, this.id, config.resizable, config.resizablePoints);

        shape.render();
        shape.addListener("resized", this.resized.bind(this));
        shape.addListener("checkMousePos", this.checkMousePosAndDrawLine.bind(this));
        shape.addListener("dropShape", this.dropShape.bind(this));
        this.listOfShapes.push(shape);
        this.virtualBandHeight += config.height + config.distance;
        this.id++
    },

    positionElements: function(array, evt) {
        var distance = this.startPos;

        for(var i = 0; i < array.length; i++) {
            array[i].row.id = "row" + i;
            array[i].element.id = i;
            array[i].setShapeYpos(distance);
            distance += array[i].getHeight() + array[i].getDistance();
            this.mainGroup.appendChild(array[i].row);
        };

        this.determineVirualBands(evt);
        evt.target.initResize(evt.target.element);
    },

    determineVirualBands: function(evt) {
        this.intervals = [];
        var firstStrip;
        var strips;

        firstStrip = {
            y1: this.listOfShapes[0].element.getBBox().y - this.listOfShapes[0].element.getBBox().height,
            y2: this.listOfShapes[0].element.getBBox().y,
            index: 0
        };

        this.intervals.push(firstStrip);

        for(var i = 0; i < this.listOfShapes.length; i++) {
            var currentElement = this.listOfShapes[i].element.getBBox();

            var interval1 = currentElement.y + currentElement.height;
            var interval2 = interval1 + evt.target.getDistance();

            strips = {};
            strips.y1 = interval1;
            strips.y2 = interval2;
            strips.index = i + 1;

            this.intervals.push(strips);
        }
    },

    checkMousePosAndDrawLine: function(evt) {
        this.determineVirualBands(evt);

        var curentMousePosition = evt.data.clientY;
        var selectedElementId = parseInt(evt.target.element.id);
        var selectedIndex = -1;

        for(var i = 0; i < this.intervals.length; i++) {
            this.flag = this.is_inside(curentMousePosition, this.intervals[i].y1, this.intervals[i].y2, selectedElementId);

            if (this.flag) {
                selectedIndex = i;

                if(selectedIndex < selectedElementId || selectedIndex !== selectedElementId) {
                    this.drawLine( this.intervals[selectedIndex].y2, evt);
                }
            }
        }

        if(selectedIndex >= 0) {
            this.reorderFlag = true;
        } else {
            this.reorderFlag = false;
            this.drawLine();
        }
    },

    dropShape: function(evt) {
        this.drawLine();

        var curentMousePosition = evt.data.clientY;
        var selectedElement = evt.target
        var selectedElementId = parseInt(evt.target.element.id);
        var selectedIndex = -1;
        var indexPosInArray;

        if(this.reorderFlag) {
            for(var i = 0; i < this.intervals.length; i++) {
                if((i-1) !== selectedElementId) {
                    var isInsideBand = this.is_inside(curentMousePosition, this.intervals[i].y1, this.intervals[i].y2, selectedElementId);
                }

                if (isInsideBand) {
                    selectedIndex = i;
                }
            }

            for(var i = 0; i < this.listOfShapes.length; i++) {
                if(parseInt(this.listOfShapes[i].element.id) === this.sendDataForDrop.elToBeChanged) {
                    var splicedShape = this.listOfShapes.splice(i, 1);
                    indexPosInArray = i;
                }
            }

            if(selectedIndex > indexPosInArray) {
                this.listOfShapes.splice(selectedIndex - 1, 0, splicedShape[0]);
            } else {
                this.listOfShapes.splice(selectedIndex, 0, splicedShape[0]);
            }

            this.reorderFlag = false;
            this.positionElements(this.listOfShapes, evt);
        } else {
            selectedElement.setShapeYpos(evt.target.elementBoundingRect.y)

            if(evt.target._resizable) {
                evt.target.initResize(evt.target.element);
            }
        }

    },

    is_inside: function (mousePos, y1, y2, selectedElementId) {
        var mouseYpos = mousePos;
        var yPos1 = y1;
        var yPos2 = y2;

        if((yPos1 <= mouseYpos) && (mouseYpos <= yPos2)) {

            this.sendDataForDrop = {
                y1: yPos1,
                y2: yPos2,
                elToBeChanged: selectedElementId
            }

            return true;
        } else {
            return false
        }
    },

    drawLine: function(yPos) {
        if(yPos) {
            this.line.setAttribute("x1", 0);
            this.line.setAttribute("x2", 9999);
            this.line.setAttribute("y1", yPos - 20);
            this.line.setAttribute("y2", yPos - 20);
        } else {
            this.line.setAttribute("x1", 9999);
            this.line.setAttribute("x2", 9999);
            this.line.setAttribute("y1", 9999);
            this.line.setAttribute("y2", 9999);
        }
    },

    resized: function(evt) {
        this.positionElements(this.listOfShapes, evt);
    }
});


// var shape = {
//     width: 800,
//     height: 50,
//     x: 100,
//     distance: 40,
//     resizable: true,
//     resizablePoints: ["top","bottom", "left",  "right"]
// };

// var shape1 = {
//     width: 750,
//     height: 50,
//     x: 100,
//     distance: 40,
//     resizable: true,
//     resizablePoints: ["top","bottom"]
// };

// var shape2 = {
//     width: 700,
//     height: 80,
//     x: 100,
//     distance: 40,
//     resizable: false,
//     resizablePoints: ["topLeft", "topRight", "bottomLeft", "bottomRight"]
// };

// var shapeManager = new MainShape();
// shapeManager.init("mainSvg", 80);

// shapeManager.createShape(shape);
// shapeManager.createShape(shape1);
// shapeManager.createShape(shape2);
