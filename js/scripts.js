// Назначаем API REST endpoint и говорим что в нем будет
var KermitModel = Backbone.Model.extend({
  url: '/muppets/1',
  defaults: {
    id: null,
    name: null,
    occupation: null
  }
});

// Создаем объект
var kermit = new KermitModel();

// Начинаем использовать
kermit.fetch().then(function() {
  kermit.get('name'); // >> "Kermit"
  kermit.get('occupation'); // >> "being green"
  kermit.set('occupation', 'muppet ringleader');
  kermit.save();
});