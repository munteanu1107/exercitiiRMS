import { CustomEvents } from "./custom_events.js";

export function Button(name, selected, customClass) {
    this.name = name;
    this.selected = selected || false;
    this.customClass = customClass;
}

Button.prototype = Object.create(CustomEvents.prototype);

Object.assign(Button.prototype, {
    constructor: Button,

    changeNameBtn: function(newName) {
        this.name = newName;
        this.btn.innerHTML = this.name;
    },

    getStateBtn: function() {
        return this.selected;
    },

    changeStateBtn: function() {
        this.selected = !this.selected;
        this.selected ? this.btn.className += " active" : this.btn.className = this.customClass;
        this.fire({type: "change", data: this.selected});
    },

    changeClassBtn: function(newClass) {
        this.customClass = newClass;
        this.btn.className = newClass;
        this.fire({type: "changeClass", data: "classChanged to: " + this.customClass});
    },

    desabled: function() {
        this.btn.className +=" disabled";
        this.fire({type: "disable", data: "disabled"});
    },

    enable: function() {
        this.className = this.customClass;
        this.btn.className = this.customClass;
        this.fire({type: "enable", data: "enabled"});
    },

    createBtn: function(parentId) {
        this.parent = document.getElementById(parentId);

        this.btn = document.createElement("div");
        this.btn.className = this.customClass;
        this.btn.innerHTML = this.name;

        this.clickHandler = this.changeStateBtn.bind(this);

        this.btn.addEventListener("click", this.clickHandler);

        this.parent.appendChild(this.btn);
    }
});

