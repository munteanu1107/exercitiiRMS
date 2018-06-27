import { CustomEvents } from "./custom_events.js";
import { Button } from "./button.js";

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

        if(!this.buttonsArray.length){
            throw new Error("ButtonsGroup object missing 'buttons' array.");
        }

        var parentDiv = document.getElementById(this.parent);
        var container = document.createElement("div");
        var classOrizontal = "btn-group btn-group-sm";
        var classVertical = "btn-group-vertical";
        var btn;


        container.className = this.orientation === "orizontal" ? classOrizontal : classVertical;
        container.id = this.orientation;

        parentDiv.appendChild(container);

        this.changesMade = this.verifyIfChangeOccurred.bind(this);
        this.getSelectedItems = this.returnSelectedButtons.bind(this);
        this.getUnselectedItems = this.returnUnselectedButtons.bind(this);

        container.addEventListener("click", this.getSelectedItems);
        container.addEventListener("click", this.getUnselectedItems);

        this.arrayOfElements = [];

        for(var i = 0; i < this.buttonsArray.length; i++) {
            if(this.buttonsArray[i].customStyle) {
                btn = new Button(this.buttonsArray[i].name, this.buttonsArray[i].selected, this.buttonsArray[i].customStyle);
            } else {
                btn = new Button(this.buttonsArray[i].name, this.buttonsArray[i].selected, this.orientation === "orizontal" ? "btn btn-success" : "btn btn-warning");
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
        console.log(event.data);
        this.useGroupBtnsAsRadio(event.target);
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

    returnSelectedButtons: function() {
        var selectedButtons = [];

        for(var i = 0; i < this.arrayOfElements.length; i++) {
            var button = {};
            if(this.arrayOfElements[i].selected) {
                button["name"] = this.arrayOfElements[i].name;
                button["selected"] = this.arrayOfElements[i].selected;
                selectedButtons.push(button);
            }
        }

        this.fire({type: "getSelectedBtns", data: {
            msg: this.orientation + " Selected Buttons: ",
            selectedButtons: selectedButtons
        }});
    },

    returnUnselectedButtons: function() {
        var unselectedButtons = [];

        for(var i = 0; i < this.arrayOfElements.length; i++) {
            var button = {};
            if(!this.arrayOfElements[i].selected) {
                button["name"] = this.arrayOfElements[i].name;
                button["selected"] = this.arrayOfElements[i].selected;
                unselectedButtons.push(button);
            }
        }

        this.fire({type: "getUnselectedBtns", data: {
            msg: this.orientation + " Unselected Buttons: ",
            unselectedButtons: unselectedButtons
        }});
    }
});