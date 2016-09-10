var Todo = Backbone.Model.extend({
  defaults: {
    task: 'title',
    status: false
  },
  work: function() {
    return this.get('task') + ' is ' + this.get('status');
  }
});
