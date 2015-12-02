var app = angular.module('bookApp', ['ui.router', 'ngResource']);

////////////
// ROUTES //
////////////

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    // return to book-index if bad route request
  $urlRouterProvider.otherwise("/");
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: "templates/books-index.html"
  })
  .state('books-index', {
    url: '/books-index',
    template: "Books!"
  })
  .state('books-show', {
    url: '/books/:id', // the "id" parameter
    templateUrl: 'templates/books-show.html',
  });
});

app.controller('BookController',function($scope, Book) {
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
