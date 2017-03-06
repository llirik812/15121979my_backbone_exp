// ��������� API REST endpoint � ������� ��� � ��� �����
var KermitModel = Backbone.Model.extend({
  url: '/muppets/1',
  defaults: {
    id: null,
    name: null,
    occupation: null
  }
});

// ������� ������
var kermit = new KermitModel();

// �������� ������������
kermit.fetch().then(function() {
  kermit.get('name'); // >> "Kermit"
  kermit.get('occupation'); // >> "being green"
  kermit.set('occupation', 'muppet ringleader');
  kermit.save();
});