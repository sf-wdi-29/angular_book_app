angular
  .module('bookApp')
  .service('Book', function($resource) {
    return $resource('https://super-crud.herokuapp.com/books/:id');
  });
