import { CustomEvents } from "./custom_events.js";
import { Button } from "./button.js";

export function ButtonsGroup (arrayOfButtons, parentDiv, btnType, classCustom) {
    this.buttonsArray = arrayOfButtons || [];
    this.parent = parentDiv;
    this.btnType = btnType || "radio";
    this.classCustom = classCustom;
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
        var btn;


        container.className = this.classCustom;
        container.id =this.classCustom;

        parentDiv.appendChild(container);

        this.changesMade = this.verifyIfChangeOccurred.bind(this);

        this.arrayOfElements = [];

        for(var i = 0; i < this.buttonsArray.length; i++) {
            if(this.buttonsArray[i].customStyle) {
                btn = new Button(this.buttonsArray[i].name, this.buttonsArray[i].selected, this.buttonsArray[i].customStyle);
            } else {
                btn = new Button(this.buttonsArray[i].name, this.buttonsArray[i].selected, this.buttonsArray[i].customStyle);
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
    },

    setButtons: function(vector) {
        var counter = 0;
        for(var i = 0; i < this.arrayOfElements.length; i++) {
            var j = vector.length - 1;
            while(j >= 0) {
                if(this.btnType !== "radio") {
                    if(
                        (this.arrayOfElements[i].name === vector[j].name) &&
                        (this.arrayOfElements[i].selected !== vector[j].selected)
                    ) {
                        this.arrayOfElements[i].changeStateBtn();
                    }
                } else {
                    if(
                        (this.arrayOfElements[i].name === vector[j].name) &&
                        (this.arrayOfElements[i].selected !== vector[j].selected) && counter == 0
                    ) {
                        this.arrayOfElements[i].changeStateBtn();
                        counter++;
                    } else if(
                        (this.arrayOfElements[i].name === vector[j].name) &&
                        (this.arrayOfElements[i].selected !== vector[j].selected) && counter > 0
                    ) {
                        this.arrayOfElements[i].selected = false;
                    }
                }

                j--;
            }
        }
    }
});