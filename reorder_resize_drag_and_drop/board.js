import { IBoard } from "./interfaces/i_board.js"

export function Board() {

}

Board.prototype = Object.create(IBoard.prototype);

Object.assign(Board.prototype, {
    constructor: Board,

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

    createSvgParent: function(parentId, attrs) {
        this.parent = document.getElementById(parentId);

        this.svg = this.createNode("svg", attrs);

        return this.parent.appendChild(this.svg);
    },

    createStructure: function(width, height) {
        this.group;
        this.elements = [];

        this.createSvgParent("main", {
            width: width,
            height: height,
            id: "mainSvg"
        });

        this.svg.addEventListener("click", function(e) {
            if(e.target.id === "mainSvg") {
                document.getElementById("resize").remove()
            }
        });

        this.group = this.createNode("g");

        this.svg.appendChild(this.group);
    }
});