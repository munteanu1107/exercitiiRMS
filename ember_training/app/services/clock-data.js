import Service from '@ember/service';
import RSVP from 'rsvp';

export default Service.extend({

    defaultClock: null,

    setDefaultClock(defaultClock) {
        this.set("defaultClock", defaultClock);
    },

    getDefaultClock() {
        return this.get("defaultClock");
    },

    getJSON(url) {
        return new RSVP.Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);
            xhr.onreadystatechange = handler;
            xhr.responseType = 'json';
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.send();

            function handler() {
                if (this.readyState === this.DONE) {
                    if (this.status === 200) {
                        resolve(this.response);
                    } else {
                        reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
                    }
                }
            }
        });
    },

    fetchData() {
        var defaultData = this.getDefaultClock.bind(this);
        return Promise.all([
            this.getJSON('./data/data.json'),
            this.getJSON('./data/styleData.json'),
            this.getJSON('./data/backgroundColorConfigBtns.json'),
            this.getJSON('./data/clockHandConfigBtns.json'),
            this.getJSON('./data/indicatorsConfigBtns.json'),
            this.getJSON('./data/sizeConfigBtns.json')
        ]).then(function (json) {
            return json;
        }, function () {
            return defaultData();
        });
    }
});
