import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    type: null,
    name: null,
    buttons: null,
    selectedIndex: 0,

    btnsForBackground: computed('buttons.@each.isSelected', function() {
        var buttons = this.buttons;

        return buttons;
    }),

    init() {
        this._super(...arguments);
        this.set("buttons", this.get("model").buttons);
        this.set("name", this.get("model").name);
        this.set("target", this);

        var buttons = this.get("buttons");
        for(var i = 0; i < buttons.length; i++) {
            if (buttons[i].isSelected) {
                this.set("selectedIndex", i);
                break;
            }
        }
    },

    didRender() {
        this.useButtonsAsRadio();
    },

    useButtonsAsRadio() {
        var buttons = this.buttons;

        if(this.type === "radio") {
           for(var i = 0; i < buttons.length; i++) {
                if(buttons[i].isSelected && (i !== this.selectedIndex)) {
                    this.set("buttons." + this.selectedIndex + ".isSelected", false);
                    this.selectedIndex = i;
                } else {
                    this.set("buttons." + this.selectedIndex + ".isSelected", true);
                }
           }
        }
    },

    changeBackgroundColor(model) {
        this.get("model.target").send("changeBackgroundColor", model);
    },

    changeIndicatorsType(model) {
        this.get("model.target").send("changeIndicatorsType", model);
    },

    changeClockSize(model) {
        this.get("model.target").send("changeClockSize", model);
    },

    hideClockHand(model) {
        this.get("model.target").send("hideClockHand", model);
    }
});
