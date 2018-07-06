export function MainGraph() {

}

MainGraph.prototype = {
    constructor: MainGraph,

    getData: function() {
        return this._data;
    },

    getRandomColor: function() {
        return "#" + Math.round(Math.random() * 0xffffff).toString(16);
    },

    createNode: function(n, v) {
        n = document.createElementNS("http://www.w3.org/2000/svg", n);

        for (var p in v) {
            n.setAttributeNS(null, p.replace(/[A-Z]/g, function(item) { return "-" + item.toLowerCase(); }), v[p]);
        }

        return n;
    },

    createSvgParent: function(parentId) {
        this.parent = document.getElementById(parentId);

        this.svg = this.createNode("svg", {
            width: 500,
            height: 500,
            style: "background: #effbfc"
        });

        this.parent.appendChild(this.svg);
    },

    getArrayOfPercentages: function(obj) {
        var percentages = [];
        var getObjArr = obj.data;

        getObjArr.forEach(function(item) {
            percentages.push(item.percent)
        });

        return percentages;
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

        if(total < 100) {
            throw new Error("Your data percentage is greather than 100%");
        }
    }
}