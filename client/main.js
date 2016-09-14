var Todo = Backbone.Model.extend({
  defaults: {
    tasks : 'task title',
    status : false
  }
});

var TodoView = Backbone.View.extend({
  tagName: 'li',
  className: 'todo-item',
  todo_template: _.template('<%= tasks %>'),
  //  Constructor that is automatically called when view is initialized
  initialize: function() {
    this.render();
  },
  //  Method that renders output for model data associated with the view
  render: function() {
    this.$el.html(this.todo_template(this.model.toJSON()));
  }
});
