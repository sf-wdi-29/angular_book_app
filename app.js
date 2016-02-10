angular.module('postApp', ['ui.router', 'ngResource'])
  .config( postConfig );

  function postConfig ( $locationProvider, $stateProvider, $urlRouterProvider ) {
      // return to post-index if bad route request
      $urlRouterProvider.otherwise("/");
      $stateProvider
      .state('home', {
          url: '/',
          template: "Home!"
      })
      .state('posts-index', {
          url: '/posts-index',
          template: "Postss!"
      });
      console.log("Config loaded.");
  };
