# Angular Resource

Built on the top of the `$http` service, Angular’s `$resource` is a service that lets you interact with RESTful backends easily. `$resource` is very similar to models in Rails. In this tutorial, we're going to make use of a book API that can be found here: `http://daretodiscover.herokuapp.com/books`. The request syntax of the books API follows the same pattern as the wine API that you used yesterday.

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
  angular.module('bookApp').service('Book', function($resource) {
    return $resource('http://daretodiscover.herokuapp.com/books/:id');
  });
  ```

1. Add a script tag in your index.html linking to `services.js` after your `app.js` script tag.

1. The result of this function call is a resource class object which has the following five methods by default: `get()`, `query()`, `save()`, `remove()`, `delete()` (delete is an alias for remove)

1. Now we can use the `get()`, `query()`, `save()`, and `delete()` methods in a controller:
  ```js
  app.controller('BooksController',function($scope, Book) {
      $scope.book = Book.get({ id: 1843 }, function(data) {
        console.log(data);
      }); // get() returns a single book

  $scope.books = [];
  $scope.newBook = {};

  $scope.books = Book.query(); // returns all the books

  $scope.createBook = function(){
    Book.save($scope.newBook);
    $scope.newBook = {}; // clear new book object
    $scope.books = Book.query();
  };

  $scope.updateBook = function(book) {
    Book.get({ id: book.id }, function() {
      Book.update({id: book.id}, book);
      book.editForm = false;
    }); 
  };

  $scope.deleteBook = function(book) {
    Book.remove({id:book.id});
    var bookIndex = $scope.books.indexOf(book);
    $scope.books.splice(bookIndex, 1);
  };
});
  ```

  The `get()` function in the above snippet issues a GET request to `/books/:id`.

  The function `query()` issues a GET request to /api/entries (notice there is no `:id`).

  The `save()` function issues a POST request to `/api/entries` with the first argument as the post body. The second argument is a callback which is called when the data is saved.

1. We are good to go for the create, read and delete parts of CRUD. However, since update can use either PUT or PATCH, we need to modify our custom factory `Book` as shown below.
  ```js
  angular.module('bookApp').factory('Book', function($resource) {m
    return $resource('http://daretodiscover.herokuapp.com/books/:id', { id: '@_id' }, {
      update: {
        method: 'PUT' // this method issues a PUT request
      }
    });
  });
  ```

## Base Challenges

We're going to build a CRUD app like the `$http` one we built yesterday but using `$resource`.

1. Display all the books with all their attributes including the photo.
1. Create a form to add a new book. Make it work!
1. Add an edit button next to each book. Make it work!
1. Add a delete button next to each book. Make it work!

## Stretch Challenges
Link the `name` of each book to a view that shows only the details for that book. **Hints:**

* Use `ui-router` and `ng-view` to set up multiple views in your Angular app.
* Use `$routeParams` to figure out which book to display.
* Your view for a single book will have a different controller than your view that displays all books.
