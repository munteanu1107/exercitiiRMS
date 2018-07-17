import { CustomEvents } from "./custom_events.js";


export function Board() {

}

Board.prototype = Object.create(CustomEvents.prototype);

Object.assign(Board.prototype, {
    constructor: Board,

    render: function(parentId) {
        this.parent = document.getElementById(parentId);
        this.svg = this.createNode("svg", {
            id: "mainSvg",
            width: 1500,
            height: 1000
        });

        return this.parent.appendChild(this.svg);
    },

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

    getParent: function() {
        return this.svg;
    }
});