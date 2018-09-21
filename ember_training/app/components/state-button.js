import Component from '@ember/component';

export default Component.extend({
    classNames: ["button"],
    classNameBindings: ['isSelected:selected', "isDisabled:disabled"],
    attributeBindings: ['isDisabled:disabled'],
    isSelected:false,
    isDisabled: false,

    init() {
        this._super(arguments);
    },

    didInsertElement() {
        this._super(...arguments);
    },

    click() {
        this.set("isSelected", !this.get("isSelected"));

        switch (this.get("model.buttonFor")) {
            case "backgroundColor":
                this.get("target").changeBackgroundColor(this.model);
                break;
            case "indicators":
                this.get("target").changeIndicatorsType(this.model);
                break;
            case "size":
                this.get("target").changeClockSize(this.model);
                break;
            case "clockHand":
                this.get("target").hideClockHand(this.model);
                break;
            default:
                break;
        }
    }
});
