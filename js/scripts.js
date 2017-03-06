// Создаем модель
var MuppetModel = Backbone.Model.extend({
  defaults: {
    id: null,
    name: null,
    occupation: null
  }
});

// У нас в /muppets создан некий REST сервис отдающий json
var MuppetsCollection = Backbone.Collection.extend({
  url: '/muppets',
  model: MuppetModel,
  parse: function(data) {
    return data.muppets;
  }
});

var muppets = new MuppetsCollection();

// Вызываем REST API
muppets.fetch().then(function() {
  console.log(muppets.length); // >> length: 1
});