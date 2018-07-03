import {
    CustomEvents
} from "./customEvents.js";

export function CustomButton(name, selected, customClass) {
    this.name = name;
    this.selected = selected || false;
    this.customClass = customClass;
}

CustomButton.prototype = Object.create(CustomEvents.prototype);

Object.assign(CustomButton.prototype, {
    constructor: CustomButton,

    getNameBtn: function () {
        return this.name;
    },

    setNameBtn: function (newName) {
        if (newName && newName !== this.name) {
            this.changeNameBtn(newName);
        } else {
            throw new Error("This name " + this.name.toUpperCase() + " already exists, use a new name!")
        }
    },

    changeNameBtn: function (newName) {
        this.name = newName;
        this.btn.innerHTML = this.name;
        this.fire({
            type: "changeName",
            data: "Button changed his name to " + this.name
        });
    },


    getClassBtn: function () {
        return this.customClass;
    },

    setClassBtn: function (newClass) {
        if (newClass && newClass !== this.customClass) {
            this.changeClassBtn(newClass);
        } else {
            throw new Error("The class " + this.customClass.toUpperCase() + " already exists!")
        }
    },

    changeClassBtn: function (newClass) {
        this.customClass = newClass;
        this.btn.className = newClass;
        this.fire({
            type: "changeClass",
            data: "classChanged to: " + this.customClass
        });
    },

    disabled: function () {
        this.btn.className += " disabled";
        this.enable = false;
        this.fire({
            type: "disable",
            data: "disabled"
        });
    },

    activateBtn: function () {
        this.className = this.customClass;
        this.btn.className = this.customClass;
        this.fire({
            type: "enable",
            data: "enabled"
        });
    },

    onClickElement: function () {
        this.fire({
            type: "clickElement"
        });
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
