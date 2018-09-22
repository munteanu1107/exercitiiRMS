import { CreateNode } from "./createNodes.js";
export function Board() {}

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

Object.assign(Board.prototype,CreateNode.prototype);