import { IResize } from "./interfaces/i_resize.js";

export function Resize() {};

Resize.prototype = Object.create(IResize.prototype);

Object.assign(Resize.prototype, IResize.prototype, {
    constructor: Resize,

    resize: function(element) {
        this.removeResizableRect(element);

        var resizeRect = this.createResizableRect(element);

        element.target.parentNode.appendChild(resizeRect);
    },

    createResizableRect: function(el) {
        var selectedRect;
        var elementDetails = el.target.getBBox();
        var g;

        var data = {
            id: "resize",
            width: elementDetails.width,
            height: elementDetails.height,
            stroke: "black",
            fill: "none",
            x: elementDetails.x,
            y: elementDetails.y
        };

        selectedRect = this.createNode("rect", data);

        g = this.createNode("g", {
            id: "resize"
        });

        this.createDragablePoints(elementDetails, g)
        g.appendChild(selectedRect)

        return g;
    },

    removeResizableRect: function(el) {
        var childs = el.target.parentNode.childNodes;

        childs.forEach(element => {
           if(element.id === "resize") {
               element.remove();
           }
        });

        var domEl = document.getElementById("resize");
        if(domEl) {
            domEl.remove()
        }
    },

    createDragablePoints: function(data, append) {
        var point;
        var pointWith;
        var x1,x2,x3,x4, y1,y2,y3,y4 = 0;
        var point1, point2, point3, point4;

        this.mouseDownHandler = this.getElementOnMouseDown.bind(this);

        pointWith = 10

        x1 = data.x - (pointWith / 2);
        y1 = data.y + (data.height / 2) - (pointWith / 2);

        x2 = data.x + (data.width / 2) - (pointWith / 2);
        y2 = data.y - (pointWith / 2);

        x3 = data.x + data.width - (pointWith / 2);
        y3 = data.y + (data.height / 2) - (pointWith / 2);

        x4 = data.x + (data.width / 2) - (pointWith / 2);
        y4 = data.y + data.height - (pointWith / 2);

        point1 = this.createNode("rect", {
            width: pointWith,
            height: pointWith,
            x: x1,
            y: y1,
            fill: "black"
        });

        point2 = this.createNode("rect", {
            width: pointWith,
            height: pointWith,
            x: x2,
            y: y2,
            fill: "black"
        });

        point3 = this.createNode("rect", {
            width: pointWith,
            height: pointWith,
            x: x3,
            y: y3,
            fill: "black"
        });

        point4 = this.createNode("rect", {
            width: pointWith,
            height: pointWith,
            x: x4,
            y: y4,
            fill: "black"
        });

        point1.addEventListener("mousedown", this.mouseDownHandler)
        point2.addEventListener("mousedown", this.mouseDownHandler)
        point3.addEventListener("mousedown", this.mouseDownHandler)
        point4.addEventListener("mousedown", this.mouseDownHandler)

        append.appendChild(point1);
        append.appendChild(point2);
        append.appendChild(point3);
        append.appendChild(point4);

        return point
    },

    getElementOnMouseDown: function(el) {
        el.ondragstart = function () {
            return false;
        };


    }
});