export function LocalStorage() {

    this.storage = window.localStorage;
}

LocalStorage.prototype = {
    constructor: LocalStorage,

    set: function(key, value) {

        if (!key || !value) {
            throw new Error("Missing parameters \"key\" and \"value\"");
        } else {

            return this.storage.setItem(key, JSON.stringify(value));
        }

    },

    get: function(key) {

        if (!key) {
            throw new Error("Missing parameter \"key\"");
        }

        var value = JSON.parse(this.storage.getItem(key));

        return value
    },

    remove: function(key) {
        if (!key) {
            throw new Error("Missing parameter \"key\"");
        } else {

            return this.storage.removeItem(key);
        }
    }
}