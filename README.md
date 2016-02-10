# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Angular Resources

| **Learning Objectives** |
| :---- |
| Identify the benefits of using $resource over $http |
| Establish a connection with an external RESTful API |
| Experiment further with templating |
| Explore the endless possibilities of UI-router |
| Create your own 'ORM' between an external API and your app|

Built on the top of the `$http` service, Angular’s `$resource` is a service that lets you interact with RESTful backends easily. `$resource` is very similar to models in Rails. In this tutorial, we're going to make use of a book API that can be found here: `https://super-crud.herokuapp.com/books`. The request syntax of the books API follows the same pattern as the wine API that you used yesterday.

## Installation
1. Clone this repo and run `bower install`
1. The `$resource` service doesn’t come bundled with the main Angular script. Run `bower install --save angular-resource`.
1. Add a link to the angular-resource module in your `index.html` (BELOW angular.js!):
```html
<script src="bower_components/angular-resource/angular-resource.min.js"></script>
```
1. Now you need to load the `$resource` module into your application.
```js
angular.module('app', [..., 'ngResource']);
```
1. In the application directory run a local server:
``` bash
budo
#or
python -m SimpleHTTPServer 8000
# or
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 3000, :DocumentRoot => Dir.pwd).start'
```

## Interacting with the API
1. To use `$resource` inside your controller/service you need to declare a dependency on `$resource`. The next step is calling the `$resource()` function with your REST endpoint, as shown in the following example. This function call returns a `$resource` class representation which can be used to interact with the REST backend.

1. Create a `services.js` file and put your new `$resource` service in it.

  ```js
  angular.module('bookApp').service('Book', function($resource) {
    return $resource('https://super-crud.herokuapp.com/books/:id');
  });
  ```

1. Add a script tag in your index.html linking to `services.js` after your `app.js` script tag.

1. The result of this function call is a resource class object which has the following five methods by default: `get()`, `query()`, `save()`, `remove()`, `delete()` (delete is an alias for remove)

1. Now we can use the `get()`, `query()`, `save()`, and `delete()` methods in a controller:

```js
  angular.module('bookApp').controller('BooksController', BooksController);

  function BooksController ($scope, Book) {
    this.book = Book.get({ id: 1 }, function(data) {
      console.log(data);
    }); // get() returns a single book

    this.books = [];
    this.newBook = {};

    this.books = Book.query(); // returns all the books

    this.createBook = function(){
      this.newBook = {}; // clear new book object
      this.books = Book.query();
    };

    this.updateBook = function(book) {
      Book.query({ id: book.id }, function() {
        Book.update({id: book.id}, book);
        book.editForm = false;
      });
    };

    this.deleteBook = function(book) {
      Book.remove({id:book.id});
      var bookIndex = this.books.indexOf(book);
      this.books.splice(bookIndex, 1);
    };
    console.log("Controller loaded.");
    };
```

  The `get()` function in the above snippet issues a GET request to `/books/:id`.

  The function `query()` issues a GET request to `/books` (notice there is no `:id`).

  The `save()` function issues a POST request to `/books` with the first argument as the book data. The second argument is a callback which is called when the data is saved.

1. We are good to go for the create, read and delete parts of CRUD. However, since update can use either PUT or PATCH, we need to modify our custom factory `Book` as shown below.
  ```js
  angular.module('bookApp').factory('Book', BookFactory); 
  
  function BookFactory($resource) {
    return $resource('https://super-crud.herokuapp.com/books/:id', { id: '@_id' }, {
      update: {
        method: 'PUT' // this method issues a PUT request
      }
    });
  });
  ```

> Note: `{ id: "@_id"}` is a mapping between the placehoder in our route (e.g. `/books/:id)` and the name of the key that holds the id in the book object. And since databse is mongoDB our id is `_id`.

## Base Challenges

1. Display all the books with all their attributes including the photo.
1. Create a form to add a new book. Make it work!
1. Add an edit button next to each book. Make it work!
1. Add a delete button next to each book. Make it work!

## Stretch Challenges
Link the `title` of each book to a view that shows only the details for that book. **Hints:**

* Use `ui-router` and `ng-view` to set up multiple views in your Angular app.
* Use `$routeParams` to figure out which book to display.
* Your view for a single book will have a different controller than your view that displays all books.

###Further Reading
[Angular $resource](https://docs.angularjs.org/api/ngResource/service/$resource) - Makes RESTful CRUD API soooooo sweet!  

[Angular UI-Router](https://angular-ui.github.io/ui-router/) - Don't sweat this too much, we'll go over it tomorrow :)  

[Angular Factory vs Service vs Provider](http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/) - Know the differences!  

