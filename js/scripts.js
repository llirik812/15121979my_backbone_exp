// ������� ������
var MuppetModel = Backbone.Model.extend({
  defaults: {
    id: null,
    name: null,
    occupation: null
  }
});

// � ��� � /muppets ������ ����� REST ������ �������� json
var MuppetsCollection = Backbone.Collection.extend({
  url: '/muppets',
  model: MuppetModel,
  parse: function(data) {
    return data.muppets;
  }
});

var muppets = new MuppetsCollection();

// �������� REST API
muppets.fetch().then(function() {
  console.log(muppets.length); // >> length: 1
});