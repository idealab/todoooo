/**
 * Created by idealab on 08/18/2014.
 */

(function () {

//    var app = app || {};    // namespace definition

    /**
     * Model definition
     *
     * @type {Backbone.Model}
     */
    var Todooo = Backbone.Model.extend({
        defaults: {
            title: '',
            content_markdown: '',
            content_html: '',
            last_edit: _.now()
        },
        initialize: function() {

        }
    });

    /**
     * The global model collection definition
     *
     * @type {Backbone.Collection}
     */
    var TodoooCollection = Backbone.Collection.extend({
        model: Todooo,
        localStorage: new Backbone.LocalStorage('todooo-storage')
    });

    var TodoooBook = new TodoooCollection();

    /**
     * View definition for the model
     *
     * @type {Backbone.View}
     */
    var TodoooView = Backbone.View.extend({
        el: '#note_show_wrapper',
        template: _.template($('#note_show_wrapper').html()),
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });

    /**
     * View definition for the application
     *
     * @type {Backbone.View}
     */
    var AppView = Backbone.View.extend({
        el: '#todooo_showbox',
        initialize: function () {
            this.listenTo(TodoooBook, 'add', this.addOne);
            TodoooBook.fetch();
        },
        addOne: function (todooo) {
            var view = new TodoooView({model: todooo});
            $('#todo-list').append(view.render().el);
        }
    });

    new AppView(); // init the application
//  app.Todooos.create({title: 'From Lei', content: 'Lei: Hello Caicai~', timestamp: '2014-09-05 11:10:22'});

    // click the note content textarea to resize current edit form
//    $('#form_note_edit textarea').click(function () {
//        // TODO: resize the textarea with animation.
//
//        $('<button>').attr({
//            type: 'button',
//            class: 'btn btn-primary btn-save-note'
//        }).html('Save').click(function () {
//            var note_editform = $('#form_note_edit');
//            var note_title = note_editform.children('input:text').val();
//            var note_content = note_editform.children('textarea').val();
//            var curr_date = new Date();
//            var curr_date_formatted = stringify(curr_date.getFullYear())
//                + '-' + stringify(curr_date.getMonth())
//                + '-' + stringify(curr_date.getDate())
//                + ' ' + stringify(curr_date.getHours())
//                + ':' + stringify(curr_date.getMinutes())
//                + ':' + stringify(curr_date.getSeconds());
//
//            app.Todooos.create({
//                title: note_title,
//                content: note_content,
//                timestamp: _.now()
//            });
//        }).appendTo($('#form_note_edit'));
//    });
})();
