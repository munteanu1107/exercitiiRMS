import Service from '@ember/service';

export default Service.extend({
    tooltipComponent: null,

    setToolTipComponent: function(tooltip) {
        this.set("tooltipComponent", tooltip);
    },

    show(target, config) {
        this.tooltipComponent.setData(target, config);
    },

    hide(target) {
        this.tooltipComponent.hideComponent(target);
    }
});
