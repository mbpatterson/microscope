Router.configure({
  layoutTemplate: 'layout',     //default template
  loadingTemplate: 'loading',    //loading template for spinner
  notFoundTemplate: 'notFound',   //load notFound template if not route exists
  waitOn: function() {
    return [Meteor.subscribe('posts'), Meteor.subscribe('notifications')];
  }
});

//Default route to post list template
Router.route('/', {
  name: 'postsList'
  });

//Route to a specific post
Router.route('/posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return Meteor.subscribe('comments', this.params._id);
  },
  data: function() {
    return Posts.findOne(this.params._id);
  }
});

//edit posts
Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  data: function() {
    return Posts.findOne(this.params._id);
  }
});


//Route for new submit post page
Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

//Prevent routing to incorrect post ID
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
