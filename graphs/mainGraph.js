import { IMainGraph } from "./interfaces/interfaceMainGraph.js";

export function MainGraph() {

}
MainGraph.prototype = Object.create(IMainGraph.prototype);

Object.assign(MainGraph.prototype, {
    constructor: MainGraph,

    getData: function() {
        return this.chartData;
    },

    getRandomColor: function() {
        return "#" + Math.round(Math.random() * 0xffffff).toString(16);
    },

    createListColor: function() {
        var colors = [];
        var color;

        for(var i = 0; i < this.chartData.data.length; i++) {
            color = this.getRandomColor();
            colors.push(color);
        }

        return colors;
    },

    createNode: function(n, v) {
        n = document.createElementNS("http://www.w3.org/2000/svg", n);

        for (var p in v) {
            n.setAttributeNS(
                null,
                p.replace(/[A-Z]/g,
                function(item) {
                    return "-" + item.toLowerCase(); }
                ), v[p]);
        }

        return n;
    },

    createSvgParent: function(parentId, attrs) {
        this.parent = document.getElementById(parentId);

        this.svg = this.createNode("svg", attrs);

        return this.parent.appendChild(this.svg);
    },

    getArrayOfPercentages: function(obj) {
        var percentages = [];
        var getObjArr = obj.data;

        getObjArr.forEach(function(item) {
            percentages.push(item.percent)
        });

        return percentages;
    },

    getArrayOfNameItems: function(obj) {
        var names = [];
        var getObjArr = obj.data;

        getObjArr.forEach(function(item) {
            names.push(item.label)
        });

        return names;
    },

    getTotalPercentages: function(percentageArray) {
        var total = percentageArray.reduce(this.add, 0);

        return total;
    },

    add: function(a, b) {
        return a + b;
    },

    checkValidityOfPercentage: function() {
        var total = this.getTotalPercentages(this.getArrayOfPercentages(this.chartData));

        if(total > 100) {
            throw new Error("Your data percentage is greather than 100%");
        }
    },

    addCustomStyle: function(className) {
        var $ = this.parent;

        $.className = className;
    }
});