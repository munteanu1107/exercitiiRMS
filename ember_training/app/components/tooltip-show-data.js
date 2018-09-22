import Component from '@ember/component';

export default Component.extend({
    config: null,

    didRender() {
        this.applyConfiguration();
    },

    applyConfiguration() {
        var el = document.getElementById(this.elementId);

        el.style.backgroundColor = this.config.backgroundColor;
        el.style.padding = this.config.padding;
        el.style.textAlign = this.config.textAlign;
    }
});
