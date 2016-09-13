var Todo = Backbone.Model.extend({
  defaults: {
    task : 'hi',
    status : false,
    numb : 1
  },
  validate: function(attrs, options) {
    if (attrs.num < 0) {
      return 'Task must be filled out';
    }
  },
  work: function() {
    return this.get('task') + ' is ' + this.get('status');
  }
});
