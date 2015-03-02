var postsData = [
  {
    title: 'Introducing Telescope',
    url: 'http://telescope.com'
  },
  {
    title: 'Meteor',
    url: 'http://meteor.com'
  },
  {
    title: 'Meteor Book',
    url: 'http://discovermeteor.com'
  }
];

Template.postsList.helpers({
  posts: postsData
});
