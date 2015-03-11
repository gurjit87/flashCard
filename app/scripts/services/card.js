'use strict';

/**
 * @ngdoc service
 * @name flashCardApp.card
 * @description
 * # card
 * Service in the flashCardApp.
 */
angular.module('flashCardApp')
  .service('card', function ($firebaseArray) {
    var card = this;

    card.ref = new Firebase('https://angularflashcard.firebaseio.com/cards');
    card.cards = $firebaseArray(card.ref);

    return card; 
  });
