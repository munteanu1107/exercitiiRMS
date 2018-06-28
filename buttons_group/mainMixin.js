import { ButtonsGroupMixin } from "./buttons_groupMixin.js";
import { ButtonMixin } from "./buttonMixin.js";

var buttons = [
    {
        name: "Test0",
        selected: false,
        customStyle: "btn btn-danger"
    },
    {
        name: "Test1",
        selected: false,
        customStyle: "btn-custom"
    },
    {
        name: "Test2",
        selected: false,
        customStyle: "btn btn-success"
    }
];

var btnGroupOrizontal = new ButtonsGroupMixin(buttons, "buttons_group", "radio", "btn-group btn-group-sm");
btnGroupOrizontal.displayBtns()

var btnGroupVertical = new ButtonsGroupMixin(buttons, "buttons_group", "checkbox", "btn-group-vertical");
btnGroupVertical.displayBtns();

btnGroupOrizontal.addListener("disable", disableHandler);

btnGroupOrizontal.addListener("change", selectedBtn);


btnGroupVertical.addListener("change", selectedBtn);

// btnGroupOrizontal.disableAllBtns();
btnGroupVertical.getSelectedButtons();

function disableHandler(event) {
    console.log(event.data)
}

function selectedBtn(event) {

    console.log(event.target.getSelectedButtons());
    // console.log(event.data)
}


// var btn = new ButtonMixin("test", false, "btn btn-primary");
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