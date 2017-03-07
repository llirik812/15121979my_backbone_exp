$(window.document).ready(function() {

var MuppetModel = Backbone.Model.extend({
  defaults: {
    id: null,
    name: null,
    occupation: null
  }
});

// Collection class for the Muppets list endpoint
var MuppetCollection = Backbone.Collection.extend({
  model: MuppetModel,
  url: '/muppets',

  parse: function(data) {
    return data.muppets;
  }
});

// View class for displaying each muppet list item
var MuppetsListItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'muppet',
  template: _.template($('#muppet-item-tmpl').html()),

  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove)
  },

  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.html(html);
    return this;
  },

  events: {
    'click .remove': 'onRemove'
  },

  onRemove: function() {
    this.model.destroy();
  }
});

// View class for rendering the list of all muppets
var MuppetsListView = Backbone.View.extend({
  el: '#muppets-app',

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    var $list = this.$('ul.muppets-list').empty();

    this.collection.each(function(model) {
      var item = new MuppetsListItemView({model: model});
      $list.append(item.render().$el);
    }, this);

    return this;
  },

  events: {
    'click .create': 'onCreate'
  },

  onCreate: function() {
    var $name = this.$('#muppet-name');
    var $job = this.$('#muppet-job');

    if ($name.val()) {
      this.collection.create({
        name: $name.val(),
        occupation: $job.val()
      });

      $name.val('');
      $job.val('');
    }
  }
});

// Create a new list collection, a list view, and then fetch list data:
var muppetsList = new MuppetCollection();
var muppetsView = new MuppetsListView({collection: muppetsList});
muppetsList.fetch();

});
