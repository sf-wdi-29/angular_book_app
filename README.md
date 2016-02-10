# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Angular Resources

| **Learning Objectives** |
| :---- |
| Identify the benefits of using $resource over $http |
| Establish a connection with an external RESTful API |
| Experiment further with templating |
| Explore the endless possibilities of UI-router |
| Create your own 'ORM' between an external API and your app|


Built on the top of the `$http` service, Angular’s `$resource` is a service that lets you interact with RESTful backends easily. `$resource` is very similar to models in Rails. In this tutorial, we're going to make use of a post API that can be found here: `https://super-crud.herokuapp.com/books`. The request syntax of the posts API follows the same pattern as the wine API that you used yesterday.

## Installation
1. Clone this repo and run 'bower install'
1. The `$resource` service doesn’t come bundled with the main Angular script. Run `bower install angular-resource`.
1. Add it to your index.html below where you link to angular:
```html
<script src="bower_components/angular-resource/angular-resource.min.js"></script>
```
1. Now you need to load the `$resource` module into your application.
```js
angular.module('app', [..., 'ngResource']);
```
1. In the application directory run python -m SimpleHTTPServer 8000.

## Interacting with the API
1. To use `$resource` inside your controller/service you need to declare a dependency on `$resource`. The next step is calling the `$resource()` function with your REST endpoint, as shown in the following example. This function call returns a `$resource` class representation which can be used to interact with the REST backend.

1. Create a `services.js` file and put your new `$resource` service in it.

  ```js
  angular.module('postApp').service('Post', function($resource) {
    return $resource('https://super-crud.herokuapp.com/books/:id');
  });
  ```

1. Add a script tag in your index.html linking to `services.js` after your `app.js` script tag.

1. The result of this function call is a resource class object which has the following five methods by default: `get()`, `query()`, `save()`, `remove()`, `delete()` (delete is an alias for remove)

1. Now we can use the `get()`, `query()`, `save()`, and `delete()` methods in a controller:
  ```js
  app.controller('PostsController',function($scope, Post) {
      $scope.post = Post.get({ id: 1843 }, function(data) {
        console.log(data);
      }); // get() returns a single post

  $scope.posts = [];
  $scope.newPost = {};

  $scope.posts = Post.query(); // returns all the posts

  $scope.createPost = function(){
    Post.save($scope.newPost);
    $scope.newPost = {}; // clear new post object
    $scope.posts = Post.query();
  };

  $scope.updatePost = function(post) {
    Post.get({ id: post.id }, function() {
      Post.update({id: post.id}, post);
      post.editForm = false;
    });
  };

  $scope.deletePost = function(post) {
    Post.remove({id:post.id});
    var postIndex = $scope.posts.indexOf(post);
    $scope.posts.splice(postIndex, 1);
  };
});
  ```

  The `get()` function in the above snippet issues a GET request to `/posts/:id`.

  The function `query()` issues a GET request to /api/entries (notice there is no `:id`).

  The `save()` function issues a POST request to `/api/entries` with the first argument as the post body. The second argument is a callback which is called when the data is saved.

1. We are good to go for the create, read and delete parts of CRUD. However, since update can use either PUT or PATCH, we need to modify our custom factory `Post` as shown below.
  ```js
  angular.module('postApp').factory('Post', function($resource) {m
    return $resource('https://super-crud.herokuapp.com/books/:id', { id: '@_id' }, {
      update: {
        method: 'PUT' // this method issues a PUT request
      }
    });
  });
  ```

## Base Challenges

1. Display all the posts with all their attributes including the photo.
1. Create a form to add a new post. Make it work!
1. Add an edit button next to each post. Make it work!
1. Add a delete button next to each post. Make it work!

## Stretch Challenges
Link the `title` of each post to a view that shows only the details for that post. **Hints:**

* Use `ui-router` and `ng-view` to set up multiple views in your Angular app.
* Use `$routeParams` to figure out which post to display.
* Your view for a single post will have a different controller than your view that displays all posts.
