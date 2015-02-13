angular
  .module('fruitApp',['ui.router','ui.bootstrap'])
  .config( function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "",
        templateUrl: "templates/home.html",
        controller: allFruitController,
        controllerAs: 'fruitCtrl'
      })
      .state("about", {
        url: "/about",
        template: "<h3>Crafted By Rob</h3>"
      });
  });
angular.module('fruitApp')
  .controller('allFruitController', allFruitController);
  
function allFruitController($scope, $modal, FruitFactory) {
  var self = this;
  self.progress = 0;
  self.test = "test";
  self.clickme = function() {
        self.progress += 10;
  };
  var factory = FruitFactory;
  self.fruits = factory.get();



  self.open = function () {
    var modalInstance = $modal.open({
      templateUrl: 'templates/new.html',
      controller: 'newFruitController',
      controllerAs: 'newfruit'
    });
  }
}
angular.module('fruitApp')
  .controller('newFruitController', newFruitController);
function newFruitController(FruitFactory,$modalInstance) {
    var self = this;
    self.test = "";
    self.addFruit = function($state) {
      FruitFactory.put(self.name, self.quantity);
      $modalInstance.close();
    };
  }

angular.module('fruitApp')
  .factory('FruitFactory', FruitFactory);

function FruitFactory() {
    var fruits = [];
  return {

    put: function(name,quantity) {
           console.log("called with",name,quantity);
           fruits.push({name: name, quantity: quantity });
    },
    get: function() {
      return fruits;
    }
  };
}
