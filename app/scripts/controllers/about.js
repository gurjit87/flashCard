'use strict';

/**
 * @ngdoc function
 * @name flashCardApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flashCardApp
 */
angular.module('flashCardApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
