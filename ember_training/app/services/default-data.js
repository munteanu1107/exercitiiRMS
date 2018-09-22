import Service from '@ember/service';

export default Service.extend({
    getDefaultData() {
        const data = [{
            "data": [{
                "hour": 1
            }, {
                "hour": 2
            }, {
                "hour": 3
            }, {
                "hour": 4
            }, {
                "hour": 5
            }, {
                "hour": 6
            }, {
                "hour": 7
            }, {
                "hour": 8
            }, {
                "hour": 9
            }, {
                "hour": 10
            }, {
                "hour": 11
            }, {
                "hour": 12
            }],

            "timezone": {
                "city": "Iasi",
                "time": "+0"
            },

            "symbol": {
                "diamond": "\u25C6",
                "disc": "\u25CF"
            }
        }];

        return data;
    }
});
