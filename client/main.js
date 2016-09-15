var Todo = Backbone.Model.extend({
  defaults: {
    tasks : 'empty title',
    status : false
  }
});

var TodoList = Backbone.Collection.extend({
  //  Reference to model, url 'get'
  model : Todo,
  url: 'todos'
});

//  default tagname is 'div'
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

var TodoListView = Backbone.View.extend({
  tagName: 'ul',
  initialize: function() {
    this.collection.bind('reset', this.render, this);
  },
  render: function() {
    //  Loop over collection
    this.collection.forEach(function(t) {
      //  render for objects and display view
      var todoView = new TodoView({ model: t });
      console.log(todoView.el);
      this.$el.append(todoView.el);
    }, this);
    return this;  //  return this for chaining (thus eliminating initalize from this function)
  }

}); //  TodoListView


//  Practice view w/o data
var view = Backbone.View.extend({
  tagName: 'p',
  className: 'hi',
    initialize: function() {
      this.render();
  },
  render: function() {
    this.$el.html('hello');
  }
});

// $(function() {
//   var todos = new TodoCollection();
//   console.log(todos.fetch().toJSON());
//   console.log(todos);
//   var todosView = new TodoListView({ collection: todos});
// });

//  jQuery ready
$(function() {
  console.log('hello world');
  var v = new view();
  console.log(v.el);
  // $(document.body).append();
  $(document.body).append(v.el)
});
