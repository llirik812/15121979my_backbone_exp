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

      initialize: function() {
        this.listenTo(this.model, 'sync change', this.render);
        var self = this;
        this.model.fetch().then(function() {
            self.render();
        });
      },

      render: function() {
        var template = _.template($('#muppet-item-tmpl').html());
        var compiled = template(this.model.toJSON());
        this.$el.html(compiled);
        return this;
      }
    });
    var kermit = new KermitModel();
    var kermitView = new KermitView({model: kermit});

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