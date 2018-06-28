import { CustomEvents } from "./customEvents.js";

export function Button(name, selected, customClass) {
    this.name = name;
    this.selected = selected || false;
    this.customClass = customClass;
}

Button.prototype = Object.create(CustomEvents.prototype);

Object.assign(Button.prototype, {
    constructor: Button,

    getStateBtn: function() {
        return this.selected;
    },

    getNameBtn: function() {
        return this.name;
    },

    setNameBtn: function(newName) {
        if(newName && newName !== this.name) {
            this.changeNameBtn(newName);
        } else {
            throw new Error("This name " + this.name.toUpperCase() + " already exists, use a new name!")
        }
    },

    changeNameBtn: function(newName) {
        this.name = newName;
        this.btn.innerHTML = this.name;
        this.fire({type: "changeName", data: "Button changed his name to " + this.name});
    },


    setEnableState: function(newState) {
        if(newState) {
            this.activateBtn();
        } else {
            this.disable();
        }
    },

    getEnabledState: function() {
        return this.enable;
    },

    changeStateBtn: function() {
        if(this.btn.className.indexOf("disabled") === -1) {
            this.selected = !this.selected;
            this.selected ? this.btn.className += " active" : this.btn.className = this.customClass;
            this.fire({type: "change", data: "Button " + this.name + " changed his status to " + this.selected});
        }
    },

    getClassBtn: function() {
        return this.customClass;
    },

    setClassBtn: function(newClass) {
        if(newClass && newClass !== this.customClass) {
            this.changeClassBtn(newClass);
        } else {
            throw new Error("The class " + this.customClass.toUpperCase() +" already exists!")
        }
    },

    changeClassBtn: function(newClass) {
        this.customClass = newClass;
        this.btn.className = newClass;
        this.fire({type: "changeClass", data: "classChanged to: " + this.customClass});
    },

    desabled: function() {
        this.btn.className +=" disabled";
        this.enable = false;
        this.fire({type: "disable", data: "disabled"});
    },

    activateBtn: function() {
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

