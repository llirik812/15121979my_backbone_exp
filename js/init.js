// Customizing underscore template
_.templateSettings = {
    interpolate : /\{\{(.+?)\}\}/g
};

function init() {

// ######################## kermit-view #####################################

    var KermitModel = Backbone.Model.extend({
        url : '/muppets/1',
        defaults : {
            id: null,
            name: null,
            occupation: null
        }
    });
    var KermitView = Backbone.View.extend({
        el: '#kermit-view',
        template: _.template($('#muppet-item-tmpl').html()),
        initialize: function() {
            this.listenTo(this.model, 'sync change', this.render);
            var self = this;
            this.model.fetch();
        },
        render: function() {
            console.log('rendered ...');
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    var kermit = new KermitModel();
    var kermitView = new KermitView({model: kermit});

// ######################## kermit-events-view ###############################

    var KermitEventsView = Backbone.View.extend({
        el: '#kermit-ui-view',

        events: {
            'change .name': 'onChangeName',
            'change .occupation': 'onChangeOccupation',
        },

        onChangeName: function(evt) {
            console.log('onChangeName');
            this.model.set('name', evt.currentTarget.value);
        },

        onChangeOccupation: function(evt) {
            console.log('onChangeOccupations');
            this.model.set('occupation', evt.currentTarget.value);
        }
    });

    var kermitEventsView = new KermitEventsView({model: kermit});

// ######################## mappets-list #####################################

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

    var MuppetsListView = Backbone.View.extend({
        el: '#muppets-list',
        initialize : function() {
            console.log(this.collection);
        }
    });

    var muppetsList = new MuppetsCollection();
    var muppetsView = new MuppetsListView({
        collection: muppetsList
    });
    muppetsView.$el.append('<li>Hello World</li>');

}

$(window.document).ready(function() {
    init();
});