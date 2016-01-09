'use strict';

// // Declare app level module which depends on views, and components
// angular.module('myApp', [
//   'ngRoute',
//   'myApp.view1',
//   'myApp.view2',
//   'myApp.version'
// ]).
// config(['$routeProvider', function($routeProvider) {
//   $routeProvider.otherwise({redirectTo: '/view1'});
// }]);

angular.module('myApp', [
  'ngRoute',
  'myApp.welcome',
  'myApp.register',
  'myApp.account',
  'myApp.newpost',
  'myApp.home',
  'myApp.translate',
  'myApp.translateEditor',
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
    	redirectTo: '/welcome'
    });
}])



