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
        customStyle: "btn btn-danger"
    },
    {
        name: "Test2",
        selected: false,
        customStyle: "btn btn-success"
    }
];

var buttonsTest = [
    {
        name: "Test1",
        selected: true,
        customStyle: "btn btn-danger"
    },
    {
        name: "Test0",
        selected: false,
        customStyle: "btn-danger"
    },
    {
        name: "Test2",
        selected: true,
        customStyle: "btn btn-success"
    }
];

var btnGroupOrizontal = new ButtonsGroup(buttons, "buttons_group", "radio", "btn-group btn-group-sm");
btnGroupOrizontal.displayBtns()

var btnGroupVertical = new ButtonsGroup(buttons, "buttons_group", "checkbox", "btn-group-vertical");
btnGroupVertical.displayBtns();
btnGroupVertical.setButtons(buttonsTest);
btnGroupOrizontal.setButtons(buttonsTest);

btnGroupOrizontal.addListener("disable", disableHandler);

btnGroupOrizontal.addListener("change", selectedBtn);


btnGroupVertical.addListener("change", selectedBtn);

// btnGroupOrizontal.disableAllBtns();
btnGroupVertical.getSelectedButtons();

function disableHandler(event) {
    console.log(event.data)
}

function selectedBtn(event) {
    // console.log(event.target.getSelectedButtons());
    // console.log(event.data)
}


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