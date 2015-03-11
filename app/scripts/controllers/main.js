'use strict';

/**
 * @ngdoc function
 * @name flashCardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flashCardApp
 */
angular.module('flashCardApp')
  .controller('MainCtrl', function ($scope, card, $timeout) {
    
  	/**
  	 * Initializes the controller and all the controller data.
  	 * @return {[null]}
  	 */
    var init = function init(){
    	$scope.cards = card.cards;
    	$scope.showAnswer = false;
    	$scope.currentCard = null;
    	$scope.cards.$loaded()
    	.then(function(){
    		$scope.randomizeCard();
    		$scope.clearCard();
    	})
    	
    }

    /**
     * Creates the new card variable to bind to the dom and clears the data after the new card is saved
     * @return {[null]}
     */
    $scope.clearCard = function clearCard(){
    	$scope.newCard = {
    		question: '',
    		answer: '',
    		correct: 0,
    		incorrect: 0,
    		views: 0
    	}
    }

    $scope.showAnswerToggle = function showAnswerOn(toggle){
    	$scope.showAnswer = toggle;
    }

    $scope.answer = function answer(toggle){
    	if(toggle){
    		$scope.cards[$scope.cardIndex].correct += 1;
    	}else{
    		$scope.cards[$scope.cardIndex].incorrect += 1;
    	}
    	$scope.cards.$save($scope.cardIndex);
    	$scope.randomizeCard();
    }

    /**
     * saves a new card to the server for later testing.
     * @return {[null]}
     */
    $scope.saveCard = function saveCard(){
    	$scope.cards.$add($scope.newCard);
    	$scope.clearCard();
    }

    /**
     * Randomizes the card index for whats shown on the screen
     * @return {[null]}
     */
    $scope.randomizeCard = function randomizeCard(){
    	 $scope.cardIndex= Math.floor(Math.random() * $scope.cards.length - 1) + 0;
    	 if($scope.cards[$scope.cardIndex] == $scope.currentCard && $scope.cards.length > 1){
    		$scope.randomizeCard();
    	}else{
    		$scope.currentCard = $scope.cards[$scope.cardIndex];
    		$scope.cards[$scope.cardIndex].views += 1;
    		$scope.cards.$save($scope.cardIndex);
    		$scope.showAnswerToggle(false)
    	}
    }

    init();
  });
