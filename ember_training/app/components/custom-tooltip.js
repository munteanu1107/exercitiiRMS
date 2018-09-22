import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
    tooltipManager: service(),
    targetComponent: null,
    config:null,
    selectedElement: null,
    childComponentData:null,

    componentName: computed("config", function() {
        return this.get("config.componentName");
    }),

    init() {
        this._super(...arguments);
    },

    didRender() {
        this.get("tooltipManager").setToolTipComponent(this);
    },

    setData(data, config) {
        this.set("config", config);
        this.set("childComponentData", data);
        this.set("tooltipComponentElement", document.getElementById(this.elementId));
        this.set("selectedElement", document.getElementById(data.id));


        this.setTooltipConfig(config);
    },

    hideComponent() {
        this.set("tooltipComponentElement.style.display", "none");
    },

    setTooltipConfig(config) {
        var tooltip = this.get("tooltipComponentElement");
        var selectedEl = this.get("selectedElement");
        var selectedElBoundingRect = selectedEl.getBoundingClientRect();

        for(var key in config.tooltip) {
            tooltip.style[key] = config.tooltip[key];
        }

        this.setTooltipSide(config.tooltip.side, selectedElBoundingRect, tooltip);
        tooltip.style.display = "block";
    },

    setTooltipSide(side, elBBox, tooltip) {
        switch (side) {
            case "top":
                tooltip.style.top = (elBBox.top - 50) + "px";
                tooltip.style.left = (elBBox.left - 15) + "px";
                break;
            case "bottom":
                tooltip.style.top = (elBBox.top + 20) + "px";
                tooltip.style.left = (elBBox.left - 10) + "px";
                break;
            case "left":
                tooltip.style.top = (elBBox.top - 20) + "px";
                tooltip.style.left = (elBBox.left - 45) + "px";
                break;
            case "right":
                tooltip.style.top = (elBBox.top - 20) + "px";
                tooltip.style.left = (elBBox.left + 25) + "px";
                break;

            default:
                break;
        }
    }
});
