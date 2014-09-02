/**
 * Created by idealab on 08/18/2014.
 */

(function () {

    var app = app || {};
    app.Todooo = Backbone.Model.extend({
        title: 'empty title...',
        content: 'empty content...',
        completed: false
    });

    var TodoooList = Backbone.Collection.extend({
        model: app.Todooo,
        localStorage: new Backbone.LocalStorage('todooo-storage')
    });

    app.Todooos = new TodoooList();
    app.TodoooView = Backbone.View.extend({
        tagName: 'div',
        template: _.template($('#item-template').html()),
        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });

    app.AppView = Backbone.View.extend({
        el: '#todoapp',
        initialize: function () {
            this.listenTo(app.Todooos, 'add', this.addOne);
            app.Todooos.fetch();
        },
        addOne: function (todooo) {
            var view = new app.TodoooView({model: todooo});
            $('#todo-list').append(view.render().el);
        }
    });

    new app.AppView();

    app.Todooos.create({title: 'From Lei', content: 'Lei: Hello Caicai~', completed: false});
    app.Todooos.create({title: 'From Cai', content: 'Cai: Waaaao Lei sir!', completed: false});
    app.Todooos.create({title: 'From Lei', content: 'Lei: Yiiiio Cai Honey!', completed: true});
    app.Todooos.create({title: 'From Lei', content: 'Lei: Pls do not leave me Cai Honey!', completed: true});
})();
