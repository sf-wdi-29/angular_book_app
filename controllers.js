angular
  .module('bookApp')
  .controller('BooksController', BooksController);

function BooksController (Book) {
  var vm = this;
  this.newBook = {};
  this.books = Book.query(); // returns all the books
  this.createBook = createBook;
  this.updateBook = updateBook;
  this.deleteBook = deleteBook;

  function updateBook(book) {
    Book.update({id: book._id}, book);
    book.editForm = false;
  };

  function createBook(){
    Book.save(this.newBook, onSuccess, onError);

    function onSuccess(new_book_with_id){
      vm.newBook = {}; // clear new book object
      vm.books.push(new_book_with_id);
    }

    function onError(){
      console.log("Something went wrong...")
    }
  };

  function deleteBook(book) {
    Book.remove({id:book._id});
    var bookIndex = this.books.indexOf(book);
    this.books.splice(bookIndex, 1);
  };

  console.log("Controller loaded.");
};
