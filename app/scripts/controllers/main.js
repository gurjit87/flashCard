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
    	var newCard = Math.floor(Math.random() * $scope.cards.length - 1) + 0;
    	 if($scope.cards[newCard] == $scope.currentCard && $scope.cards.length > 1){
    		$scope.randomizeCard();
    	}else{
    		$scope.currentCard = $scope.cards[newCard];
    		$scope.cards[newCard].views += 1;
    		$scope.cards.$save(newCard);
    		$scope.showAnswerToggle(false)
    	}
    }

    init();
  });
