$(window.document).ready(function() {
    modelInit();
});

function modelInit() {
    var MuppetModel = Backbone.Model.extend({
        defaults: {
            id: null,
            name: null,
            occupation: null
        }
    });

    var MuppetsCollection = Backbone.Collection.extend({
        url: '/muppets',
        model: MuppetModel,
        parse: function(data) {
            return data.muppets;
        }
    });

    var muppets = new MuppetsCollection();

    muppets.fetch().then(function() {
        console.log(muppets.length);
    });
}
