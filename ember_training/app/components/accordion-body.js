import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    classNames: ["panel"],

    expanded: false, //comes in
    styleClass: computed("expanded", function() {
        if (this.get("expanded")) {
            return "expanded-class";
        }
        return "collapsed-class";
    }),

    init() {
        this._super(...arguments);
    }
});
