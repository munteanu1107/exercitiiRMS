import { CustomEvents } from "./custom_events.js";
import { ButtonMixin } from "./buttonMixin.js";
import { mixin } from "./mixin.js";

export function ButtonsGroupMixin (arrayOfButtons, parentDiv, btnType, classCustom) {
    this.buttonsArray = arrayOfButtons || [];
    this.parent = parentDiv;
    this.btnType = btnType || "radio";
    this.classCustom = classCustom;
}

ButtonsGroupMixin.prototype = mixin({}, CustomEvents.prototype);
mixin(ButtonsGroupMixin.prototype, {
    constructor: ButtonsGroupMixin,

    displayBtns: function() {

        if(!this.buttonsArray.length) {
            throw new Error("ButtonsGroup object missing 'buttons' array.");
        }

        var parentDiv = document.getElementById(this.parent);
        var container = document.createElement("div");
        var btn;


        container.className = this.classCustom;
        container.id =this.classCustom;

        parentDiv.appendChild(container);

        this.changesMade = this.verifyIfChangeOccurred.bind(this);

        this.arrayOfElements = [];

        for(var i = 0; i < this.buttonsArray.length; i++) {
            if(this.buttonsArray[i].customStyle) {
                btn = new ButtonMixin(this.buttonsArray[i].name, this.buttonsArray[i].selected, this.buttonsArray[i].customStyle);
            } else {
                btn = new ButtonMixin(this.buttonsArray[i].name, this.buttonsArray[i].selected, this.buttonsArray[i].customStyle);
            }

            btn.createBtn(container.id);
            btn.addListener("change", this.changesMade);
            this.arrayOfElements.push(btn);
        }
    },

    disableAllBtns: function() {
        for(var i = 0; i < this.arrayOfElements.length; i++) {
            this.arrayOfElements[i].btn.className += " disabled";
        }

        this.fire({type: "disable", data: "Horizontal btns are disabled"});
    },

    verifyIfChangeOccurred: function(event) {
        this.useGroupBtnsAsRadio(event.target);

        this.fire({type: "change", data: "Change occurred"})
    },

    useGroupBtnsAsRadio: function(radioBtn) {
        if(this.btnType === "radio") {

            for(var i = 0; i < this.arrayOfElements.length; i++) {
                if(this.arrayOfElements[i].btn.className.indexOf("active") > 0) {
                    this.arrayOfElements[i].btn.className = this.arrayOfElements[i].customClass || "btn btn-success";
                    this.arrayOfElements[i].selected = false;
                }
            }

            radioBtn.btn.className += " active";
            radioBtn.selected = true;
        }
    },

    getSelectedButtons: function() {
        var selectedButtons = [];

        for(var i = 0; i < this.arrayOfElements.length; i++) {
            var button = {};
            if(this.arrayOfElements[i].selected) {
                button["name"] = this.arrayOfElements[i].name;
                button["selected"] = this.arrayOfElements[i].selected;
                selectedButtons.push(button);
            }
        }

        return selectedButtons;
    },

    getUnselectedButtons: function() {
        var unselectedButtons = [];

        for(var i = 0; i < this.arrayOfElements.length; i++) {
            var button = {};
            if(!this.arrayOfElements[i].selected) {
                button["name"] = this.arrayOfElements[i].name;
                button["selected"] = this.arrayOfElements[i].selected;
                unselectedButtons.push(button);
            }
        }

        return unselectedButtons;
    }
});