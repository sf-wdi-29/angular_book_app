var app = angular.module('bookApp', ['ui.router']);

////////////
// ROUTES //
////////////

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });

    // return to wine-index if bad route request
    $urlRouterProvider.otherwise("/");

})

/////////////////
// CONTROLLERS //
/////////////////

app.controller('BooksIndexCtrl', ['$scope', function($scope) {
    console.log("Wine Index");
}]);

app.controller('BooksShowCtrl', ['$scope', function($scope) {
    console.log("Wine Show");
}]);

////////////
// MODELS //
////////////

app.factory('BookService', function() {

    var BookService = {};

    BookService.query = function() {
        return ALL_WINES;
    }

    BookService.get = function(id) {
        var id = parseInt(id);
        return ALL_WINES.find(function(wine) {
            return wine.id == id;
        });
    }

    return BookService;

})




