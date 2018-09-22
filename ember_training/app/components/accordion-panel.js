import Component from '@ember/component';

export default Component.extend({
    classNames: ["accordion-style"],
    expanded: false,
    target: undefined,

    init: function(...args) {
        this._super(args);
        this.set("target", this);
    }
});
