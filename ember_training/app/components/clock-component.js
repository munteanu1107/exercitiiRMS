import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({
    classNames: ['main'],
    svgDimension: 400,
    circleYpos: 200,
    circleXpos: 200,
    radius: null,
    centerCirclePoint: 200,
    fontSize: 20,
    secondsX2: null,
    secondsY2: null,
    minutesX2: null,
    minutesY2: null,
    hoursX2: null,
    hoursY2: null,


    init() {
        this._super(...arguments);
        this.distriubuteHours(this.model.data);
    },

    didRender() {
        this._super(...arguments);
        this.moveIndicators(this.timezone);
    },

    actions: {
        mouseEntered(clock) {
            this.sendActionComponent(clock);
        },

        mouseOut(clock) {
            this.sendActionHideComponent(clock);
        }
    },

    distriubuteHours(data) {
        var radius = this.radius - this.fontSize;
        var angle = ((360 / 12) * (Math.PI / 2)) / 90 - (Math.PI / 2);
        var step = (2 * Math.PI) / data.length;
        var xPos = 0;
        var yPos = 0;

        for (var i = 0; i < data.length; i++) {
            xPos = Math.round(this.centerCirclePoint + (radius * Math.cos(angle)) - Math.PI / 2);
            yPos = Math.round(this.centerCirclePoint + (radius * Math.sin(angle)) + Math.PI / 2);

            data[i].xpos = xPos;
            data[i].ypos = yPos;

            angle += step;
        }

        return data;
    },

    moveIndicators(timezone) {
        var secDeg;
        var minDeg;
        var hourDeg;
        var now;

        if (timezone) {
            now = this.calculateTimezone(timezone);
        } else {
            now = new Date();
        }

        hourDeg = (now.getHours() * 360 / 12 + ((now.getMinutes() * 360 / 60) / 12));
        minDeg = (now.getMinutes() * 360 / 60) + ((now.getSeconds() * 360 / 60) / 60);
        secDeg = (now.getSeconds() * 360 / 60);

        this.set("secondsX2", this.calculateAngle(200, 130, secDeg).x);
        this.set("secondsY2", this.calculateAngle(200, 130, secDeg).y);
        this.set("minutesX2", this.calculateAngle(200, 100, minDeg).x);
        this.set("minutesY2", this.calculateAngle(200, 100, minDeg).y);
        this.set("hoursX2", this.calculateAngle(200, 80, hourDeg).x);
        this.set("hoursY2", this.calculateAngle(200, 80, hourDeg).y);

        later(this, this.moveIndicators, 1000);
    },

    convertDegToRad(degrees) {
        return degrees * Math.PI / 180;
    },

    calculateAngle(centerPoint, radius, degrees) {
        var xpos = Math.round(centerPoint + (radius * Math.cos(this.convertDegToRad(degrees) - Math.PI / 2)));
        var ypos = Math.round(centerPoint + (radius * Math.sin(this.convertDegToRad(degrees) - Math.PI / 2)));

        return {
            x: xpos,
            y: ypos
        };
    },

    calculateTimezone(offset) {
        var date = new Date();
        var utc = date.getTime() + (date.getTimezoneOffset() * 60000) + 10800000;
        var new_date = new Date(utc + (3600000 * offset));

        return new_date;
    }
});