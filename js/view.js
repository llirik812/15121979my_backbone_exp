$(window.document).ready(function() {
    viewInit();
});

function viewInit() {
    var myFirstBackboneViewConstructor = Backbone.View.extend({
        el: '#myFirstBackboneView'
    });
    var myFirstBackboneView = new myFirstBackboneViewConstructor();

    myFirstBackboneView.$el.append('<li>Hello World</li>');
}