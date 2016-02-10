angular.module('postApp').controller('PostsController', PostsController);

function PostsController ($scope, Post) {
    this.post = Post.get({ id: 1 }, function(data) {
      console.log(data);
    }); // get() returns a single post

    this.posts = [];
    this.newPost = {};

    this.posts = Post.query(); // returns all the posts

    this.createPost = function(){
      Post.save($scope.newPost);
      this.newPost = {}; // clear new post object
      this.posts = Post.query();
    };

    this.updatePost = function(post) {
      Post.get({ id: post.id }, function() {
        Post.update({id: post.id}, post);
        post.editForm = false;
      });
    };

    this.deletePost = function(post) {
      Post.remove({id:post.id});
      var postIndex = this.posts.indexOf(post);
      this.posts.splice(postIndex, 1);
    };
    console.log("Controller loaded.");
};
