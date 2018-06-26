import { CustomEvents } from "./custom_events.js";

export function ButtonsGroup (arrayOfButtons, parentDiv, btnType, orientation) {
    this.buttonsArray = arrayOfButtons || [];
    this.parent = parentDiv;
    this.btnType = btnType || "radio";
    this.orientation = orientation;
}

ButtonsGroup.prototype = Object.create(CustomEvents.prototype);

Object.assign(ButtonsGroup.prototype, {
    constructor: ButtonsGroup,

    displayBtns: function() {
        this.parentDiv = document.getElementById(this.parent);
        var container = document.createElement("div");

        var classOrizontal = "btn-group btn-group-sm";
        var classVertical = "btn-group-vertical";
        var btn;

        if(!this.buttonsArray.length){
            throw new Error("ButtonsGroup object missing 'buttons' array.");
        }

        container.className = this.orientation === "orizontal" ? classOrizontal : classVertical;

        this.parentDiv.appendChild(container);
        this.arrayOfElements = [];

        for(var i = 0; i < this.buttonsArray.length; i++) {
            btn = document.createElement("div");
            btn.innerHTML = this.buttonsArray[i].name;
            btn.className = this.orientation === "orizontal" ? "btn btn-success" : "btn btn-warning";
            container.appendChild(btn);
            this.arrayOfElements.push(btn);
        }
    },
    disable: function() {
        for(var i = 0; i < this.arrayOfElements.length; i++) {
            this.arrayOfElements[i].className += " disabled";
        }

        this.fire({type: "disable", data: "Horizontal btns are disabled"})
    }
});