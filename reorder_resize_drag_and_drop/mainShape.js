import { Shape } from "./shape.js";
import { CustomEvents } from "./custom_events.js";
import { Resize } from "./resize.js";

export function MainShape() {

}

MainShape.prototype = Object.create(CustomEvents.prototype);

Object.assign(MainShape.prototype, Resize.prototype, {
    constructor: MainShape,

    render: function(parent, config) {
        this.list = [];
        // this.clickHandler = this.resize.bind(this);

        for(var i = 0; i < config.elements; i++) {
            var shape = new Shape(parent, config.width, config.height, config.x, config.y, config.distance, i);

            config.y += (config.height + config.distance);
            config.width -= config.height;
            shape.render();
            // shape.addListener("clicked", this.clickHandler);
        }
    }
});