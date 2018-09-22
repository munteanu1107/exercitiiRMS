import Component from '@ember/component';

export default Component.extend({
    classNames: ["accordion"],
    classNameBindings: ['isEnabled::active'],
    isEnabled: true,
    expanded: false, //comes in
    target: undefined, //comes in

    click: function() {
        //debugger;
        this.set("expanded", !this.get("expanded"));
    }
});
