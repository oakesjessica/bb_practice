var Todo = Backbone.Model.extend({
  defaults: {
    task : 'task title',
    status : false
  }
});

var TodoView = Backbone.View.extend({
  tagName: 'li',
  className: 'todo-item',
  //  Constructor that is automatically called when view is initialized
  initialize: function() {
    this.render();
  },
  //  Method that renders output for model data associated with the view
  render: function() {
    this.$el.html(this.model.get('task'));
  }
});
