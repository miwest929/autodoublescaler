'use strict';

var autodoublescaler = angular.module('autodoublescaler.controllers', []);

autodoublescaler.controller('HomeCtrl', function ($scope, $http, $state) {
  $scope.width = 900;
  $scope.height = 500;
  $scope.padding = 20;
  $scope.graphX = 20;
  $scope.graphY = 20;

  var initLineData = function() {
    $scope.maxRight = 0;
    return [{"x": $scope.graphX, "y": $scope.height - $scope.graphY + $scope.padding}]
  };

  var lineFunction = d3.svg.line()
                       .x(function(d) { return d.x; })
                       .y(function(d) { return d.y; })
                       .interpolate('basis');

  var lineData = initLineData();

  $scope.svg = $scope.D3_SVG.createSVG($scope.width + $scope.padding, $scope.height + $scope.padding);
  console.log($scope.svg);
  $scope.yAxis = $scope.D3_SVG.createYAxis($scope.height - $scope.graphY);
  $scope.xAxis = $scope.D3_SVG.createXAxis($scope.width - $scope.graphY);

  $scope.svg.append("rect")
    .attr("x", 20)
    .attr("y", $scope.padding)
    .attr("height", $scope.height - $scope.graphY)
    .attr("width", $scope.width - $scope.graphX)
    .style("stroke", 'black')
    .style("fill", "none")
    .style("stroke-width", 1);

    $scope.svg.append("g")
              .attr('transform', 'translate(25, 10)')
              .attr("class", "axis")
              .call($scope.yAxis);

    $scope.svg.append("g")
              .attr('transform', 'translate(20, ' + ($scope.height - 22 + $scope.padding)  + ')')
              .attr("class", "axis")
              .call($scope.xAxis);

  $scope.path = $scope.svg.append("path")
      .attr("d", lineFunction(lineData))
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("fill", "none");

  $scope.startDraw = function(e) {
    console.log("Inside startDraw");
    if (e.clientX > $scope.maxRight) {
      var target = e.target;
      var realX = e.clientX - target.getBoundingClientRect().left - target.clientLeft + target.scrollLeft
      $scope.maxRight = e.clientX;
      lineData.push({"x": realX, "y": e.clientY});
      $scope.path.attr("d", lineFunction(lineData));
      $scope.svg.selectAll('circle')
                .data(lineData)
                .enter().append('circle')
                .attr('cx', function (d) { return d.x; })
                .attr('cy', function (d) { return d.y; })
                .on('click', function () {
                  console.log("CLICKED ON A DATAPOINT");
                  d3.event.stopPropagation();
                })
                .attr('r', 4);
    }
  };

  $scope.clearGraph = function() {
    lineData = initLineData();
    $scope.path.remove();
    $scope.svg.selectAll('circle').remove();
  };

  $scope.performTest = function() {
    var pathLen = $scope.path.node().getTotalLength();
    var partCount = 600;

    var plan = [];
    for(var part = 0; part < partCount; part++) {
      var pt = $scope.path.node().getPointAtLength((part / partCount) * pathLen);
      plan[ Math.ceil(pt.x - 20) ] = Math.floor($scope.height - pt.y);
      console.log("At " + Math.ceil(pt.x - 20) + "s perform " + Math.floor($scope.height - pt.y) + " rps");
    }

    $http.defaults.headers.put['Content-Type'] = 'application/json';
    $http({method: 'post', url: '/api/perfplan', data: {'data': plan}})
      .success( function(data, status, headers, config) { console.log(data + " : " + status); })
      .error( function(data, status, headers, config) { console.log(data + " : " + status); });
    //});
  };
});
