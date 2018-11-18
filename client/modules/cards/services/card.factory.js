(function() {
  'use strict';
  angular.module('cards')
    .factory('CardFactory', CardFactory);

  function CardFactory() {
    var factory = {},
      backTexture = new THREE.TextureLoader().load('modules/cards/textures/card_back.png'),
      dir = 'modules/cards/textures/';

    factory.create = create;
    factory.ranks = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
    factory.suits = ['clubs', 'diamonds', 'hearts', 'spades'];

    return factory;


    function create(rank, suit) {
      var frontTexture = new THREE.TextureLoader().load(dir + rank + '_of_' + suit + '.png');
      frontTexture.repeat.set(1, 1);
      var geometry = new THREE.BoxGeometry(1,1.5, 0.01);
      var material = new THREE.MeshBasicMaterial({
        map: frontTexture
      });
      var material2 = new THREE.MeshBasicMaterial({
        map: backTexture
      });
      var card = new Physijs.BoxMesh(geometry, material);
      card.material = [material, material2]
console.log('geometry:', geometry);
      // var cardBack = new Physijs.BoxMesh(geometry, material.clone());
      // cardBack.material.map = backTexture;
      // cardBack.rotation.y = Math.PI;
      // cardBack.position.z = .01;
      // card.add(cardBack);

      return card;
    }

  }
}());
