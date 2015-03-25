'use strict';

angular.module('d3', [])
  .factory('d3Service', [function() {
    var d3;

    return d3;
}]);
angular.module('app', ['d3']);

angular.module('autodoublescaler', [
  'ui.router',
  'autodoublescaler.controllers',
  'autodoublescaler.filters',
  'autodoublescaler.services',
  'autodoublescaler.directives',
]).
config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    templateUrl: '/',
    controller: 'HomeCtrl'
  }).
  // This is an example state. Please replace with one that makes sense for your application
  state('example-state', {
    url: '/example/:name',
    templateUrl: '/example',
    controller: 'ExampleCtrl'
  });
});
