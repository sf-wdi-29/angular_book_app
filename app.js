var app = angular.module('bookApp', ['ui.router']);

////////////
// ROUTES //
////////////

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    // return to book-index if bad route request
    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state('home', {
        url: '/',
        template: "Home!"
    })
    .state('books-index', {
        url: '/books-index',
        template: "Books!"
    });

});


