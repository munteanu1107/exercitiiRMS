import { IResize } from "./interfaces/i_resize.js";

export function Resize() {};

Resize.prototype = Object.create(IResize.prototype);

Object.assign(Resize.prototype, IResize.prototype, {
    constructor: Resize,

    resize: function(evt) {
        console.log(evt.target)
    },

    createResizableRect: function() {

    }
});