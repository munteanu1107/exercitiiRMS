import { ButtonsGroup } from "./buttons_group.js";
import { Button } from "./button.js";

var buttons = [
    {
        name: "Test0",
        selected: false,
        customStyle: "btn btn-danger"
    },
    {
        name: "Test1",
        selected: false,
        customStyle: ""
    },
    {
        name: "Test2",
        selected: false,
        customStyle: "btn btn-success"
    }
];

var btnGroupOrizontal = new ButtonsGroup(buttons, "buttons_group", "radio", "orizontal");
btnGroupOrizontal.displayBtns()

var btnGroupVertical = new ButtonsGroup(buttons, "buttons_group", "checkbox", "vertical");
btnGroupVertical.displayBtns();

btnGroupOrizontal.addListener("disable", disableHandler);
btnGroupOrizontal.addListener("getSelectedBtns", getSelectedBtnsHandler);
btnGroupOrizontal.addListener("getUnselectedBtns", getUnselectedBtnsHandler);
btnGroupOrizontal.addListener("change", selectedBtn);

btnGroupVertical.addListener("getSelectedBtns", getSelectedBtnsHandler);
btnGroupVertical.addListener("getUnselectedBtns", getUnselectedBtnsHandler);
btnGroupVertical.addListener("change", selectedBtn);

// btnGroupOrizontal.disableAllBtns();
btnGroupVertical.returnSelectedButtons();

function disableHandler(event) {
    console.log(event.data)
}

function selectedBtn(event) {
    console.log(event.data)
}

function getSelectedBtnsHandler(event) {
    console.log(event.data);
};

function getUnselectedBtnsHandler(event) {
    console.log(event.data);
};



// var btn = new Button("test", false, "btn btn-primary");
// btn.createBtn("buttons_group");

// btn.addListener("changeClass", setClassHandle);
// btn.addListener("change", onHandleChange);

// btn.setClassBtn("btn btn-primary");
// btn.changeStateBtn();


// function setClassHandle(event) {
//     console.log(event.data)
// }

// function onHandleChange(event) {
//     console.log(event.data)
// }