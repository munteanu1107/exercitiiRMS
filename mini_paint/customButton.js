import { CustomEvents } from "./customEvents.js";
import { Button } from "./button.js";

export function CustomButton(name, selected, customClass) {
    this.name = name;
    this.selected = selected || false;
    this.customClass = customClass;
}

CustomButton.prototype = Object.create(CustomEvents.prototype);

Object.assign(CustomButton.prototype, Button.prototype, {
    constructor: CustomButton,

    onClickElement: function () {
        this.fire({ type: "clickElement" });
    },

    createBtn: function (parentId) {
        this.parent = document.getElementById(parentId);

        this.btn = document.createElement("div");
        this.btn.className = this.customClass;
        this.btn.id = this.name;
        this.btn.innerHTML = this.name;

        this.clickHandler = this.onClickElement.bind(this);
        this.btn.addEventListener("click", this.clickHandler);

        this.parent.appendChild(this.btn);
    }
});
