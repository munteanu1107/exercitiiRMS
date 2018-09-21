import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    tooltipManager: service(),
    configTooltip: null,

    init: function() {
        this._super(...arguments);
        this.set("target", this);

        this.set("configTooltip", {

            tooltip: {
                position: "absolute",
                borderRadius: "2px",
                backgroundColor: "#e6e6e6b3",
                textAlign: "center",
                padding: "10px",
                boxShadow: "1px 2px #9e9e9e8c",
                side: "left"
            },
            componentName: "tooltip-show-data",
            component: {
                textAlign: "center",
                padding: "3px",
                backgroundColor: "rgba(38, 227, 161, 0.6)",
            }
        });
    },

    changeIndicators(model, indicator) {
        var place = "model.0." + model.index + model.suffix;
        var data = this.get(place);
        for(var i = 0; i <= data.length; i++) {
            if(indicator === "numbers") {
                this.set(place + "." + i + ".hour", (i+1));
                this.set(place + "." + i + ".id", "0" + this.get("model.0." + model.index + ".id") + (i+1));
            } else {
                this.set(place + "." + i + ".hour", indicator);
                this.set(place + "." + i + ".id", "0" + this.get("model.0." + model.index + ".id") + (i+1));
            }
        }
    },

    hideRestoreClockHand(color, isSelected) {
        var getSelection = this.get(isSelected);

        if(getSelection) {
            return "none";
        } else {
            return color;
        }
    },

    actions: {
        changeBackgroundColor(model) {
            this.set("model.1." + model.index + model.suffix, model.value);
        },

        changeIndicatorsType(model) {
            this.set("model.0." + model.index + model.suffix, this.changeIndicators(model ,model.value));
        },

        changeClockSize(model) {
            this.set("model.0." + model.index + model.suffix, model.value);
        },

        hideClockHand(model) {
            this.set("model.1." + model.index + model.suffix, this.hideRestoreClockHand(model.color, model.pathIsSelected));
        },

        getComponent(target) {
            this.tooltipManager.show(target, this.get("configTooltip"));
        },

        hideComponent(target) {
            this.tooltipManager.hide(target);
        }
    }
});
