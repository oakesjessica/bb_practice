var Todo = Backbone.Model.extend({
  defaults: {
    tasks : 'task title',
    status : false
  }
});

var TodoCollection = Backbone.Collection.extend({
  model : Todo,
  url: 'todos'
});

// var todos = new TodoCollection();
// todos.fetch();
var todos = new TodoCollection([
	{
		tasks: 'Mohit Jain',
		status: false
	},
	{
		tasks: 'Taroon Tyagi',
		age: false
	},
	{
		tasks: 'Rahul Narang',
		age: false
	}
]);
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
  render: function() {
    //  Loop over collection
    this.collection.each(function(t) {
      //  render for objects and display view
      var todoView = new TodoView({ model: t });
      console.log(todoView.el);
      console.log('this', this);
      this.$el.append(todoView.el);
    }, this);
    return this;  //  return this for chaining (thus eliminating initalize from this function)
  }

})
