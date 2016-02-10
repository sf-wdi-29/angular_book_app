angular.module('postApp', ['ui.router', 'ngResource'])
  .config( postConfig );

  function postConfig ( $locationProvider, $stateProvider, $urlRouterProvider ) {
      // return to post-index if bad route request
      $urlRouterProvider.otherwise("/");
      $stateProvider
      .state('home', {
        url: '/',
        templateUrl: "templates/posts-index.html"
      })
      .state('posts-index', {
        url: '/posts-index',
        templateUrl: "templates/posts-index.html",
      })
      .state('posts-show', {
        url: '/posts/:id', // the "id" parameter
        templateUrl: 'templates/posts-show.html',
      });
      console.log("Config loaded.");
  };
