import { ButtonsGroup } from "./buttons_group.js";
import { Button } from "./button.js";

var buttons = [
    {
        name: "Test0",
        selected: false
    },
    {
        name: "Test1",
        selected: false
    },
    {
        name: "Test2",
        selected: false
    }
];

var btnGroupOrizontal = new ButtonsGroup(buttons, "buttons_group", "radio", "orizontal");
btnGroupOrizontal.displayBtns()

var btnGroupVertical = new ButtonsGroup(buttons, "buttons_group", "radio", "vertical");
btnGroupVertical.displayBtns();

btnGroupOrizontal.addListener("disable", disableHandler);
btnGroupOrizontal.disable();

function disableHandler(event) {
    console.log(event.data)
}


// var btn = new Button("test", false, "btn btn-primary");
// btn.createBtn("buttons_group");

// btn.addListener("changeClass", onHandleChange);

// btn.changeClassBtn("btn btn-danger");


// function onHandleChange(event) {
//     console.log(event.data)
// }