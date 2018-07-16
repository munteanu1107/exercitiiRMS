import { Shape } from "./shape.js";

var x = new Shape();
console.log(x)

x.render({
    els: 10,
    width: 800,
    height: 50,
    x: 100,
    y: 80,
    distance: 10,
    borderRadius: 25
})