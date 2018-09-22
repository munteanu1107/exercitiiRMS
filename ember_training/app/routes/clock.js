import Route from '@ember/routing/route';

export default Route.extend({

    model() {
        var data = this.clockData.fetchData();

        return data;
    },

    setupController(controller, model) {
        // Call _super for default behavior
        this._super(controller, model);
        var data = [];
        for(var i = 0; i < model[0].length; i++) {
            model[0][i].style = model[1][i];
            model[0][i].buttonsConfig = [model[2][i], model[3][i], model[4][i], model[5][i]];

            model[2][i].target = controller;
            model[3][i].target = controller;
            model[4][i].target = controller;
            model[5][i].target = controller;

            data.push(model[0][i]);
        }
        // Implement your custom setup after
        controller.set("dataObject", data);
    }
});
