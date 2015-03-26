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
run(function($rootScope) {
  $rootScope.D3_SVG = {
    createSVG: function(width, height) {
      console.log("Inside createSVG");
      return d3.select('#svg_container')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    },
    createYAxis: function(height) {
      var y = d3.scale.linear()
                .domain([0, 500])
                .range([height, 20]);

      return d3.svg.axis()
                   .scale(y)
                   .orient("left")
                   .ticks(25);
    },
    createXAxis: function(width) {
      var x = d3.scale.linear()
                .domain([0, 600])
                .range([0, width]);

      return d3.svg.axis()
                   .scale(x)
                   .orient("bottom")
                   .ticks(40);
    }
  }
}).
config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    templateUrl: '/',
    controller: 'HomeCtrl'
  });
});
