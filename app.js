angular.module('bookApp', ['ui.router', 'ngResource'])
  .config( bookConfig );

  function bookConfig ( $locationProvider, $stateProvider, $urlRouterProvider ) {
      // return to book-index if bad route request
      $urlRouterProvider.otherwise("/");
      $stateProvider
      .state('home', {
          url: '/',
          template: "Home!"
      })
      .state('books-index', {
          url: '/books',
          template: "Books!"
      });
      console.log("Config loaded.");
  };
