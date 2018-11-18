(function() {
  'use strict';
  angular.module('scene')
    .controller('SceneCtrl', SceneCtrl);

  SceneCtrl.$inject = ['CardFactory', '$timeout'];

  function SceneCtrl(CardFactory, $timeout) {

    var vm = this;
    vm.deck = [];

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12;
    camera.position.y = 5;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    Physijs.scripts.worker = 'public/vendor/Physijs/physijs_worker.js';
    Physijs.scripts.ammo = '../ammo/builds/ammo.js';

    var scene = new Physijs.Scene();
    scene.add(camera);

    CardFactory.ranks.forEach(function (rank) {
      CardFactory.suits.forEach(function (suit) {
        var card = CardFactory.create(rank, suit);


        vm.deck.push(card);
      });
    });

    var wtf = new THREE.BoxGeometry(2,2,2);
    var hard = new THREE.Mesh(wtf, new THREE.MultiMaterial([
      new THREE.MeshBasicMaterial({color: 'blue'}),
      new THREE.MeshBasicMaterial({color: 'red'}),
      new THREE.MeshBasicMaterial({color: 'green'}),
      new THREE.MeshBasicMaterial({color: 'yellow'}),
      new THREE.MeshBasicMaterial({color: 'pink'}),
      new THREE.MeshBasicMaterial({color: 'purple'})
    ]))

    scene.add(hard)

    console.log('hard:', hard);


    document.addEventListener('keypress', function () {
      if (!vm.deck.length) return;
      var card = vm.deck.pop();
      var cameraPosition = camera.position;
      card.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

      card.rotation.x = Math.PI / 2;
      scene.add(card);

      card.setLinearVelocity(new THREE.Vector3(Math.max(Math.random() * 5 - 2.5, 2), Math.random() * 2, Math.random() * - 15 + 2));
      card.setAngularVelocity(new THREE.Vector3(0, Math.random() * 25, 0));

    })


    var floorGeometry = new THREE.CubeGeometry(100, 100, 1);
    var floorMaterial = new THREE.MeshBasicMaterial({color: 'green'});
    var floor = new Physijs.BoxMesh(floorGeometry, floorMaterial, 0);
    floor.rotation.x = Math.PI / 2;

    scene.add(floor);


    function render() {
      scene.simulate();
      requestAnimationFrame(render);
hard.rotation.y += .01
      renderer.render(scene, camera);

    }
    render();
  }
}());
