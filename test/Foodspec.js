describe('FruitController Test', function() {
  beforeEach( module('fruitApp'));
  var mockFruits = {
    fruitArray: ['apple','banana'],
    get: function() {
      return this.fruitArray;
    },
    put: function(fruit) {
      this.fruitArray.push(fruit);
         }
  };
  it('has a test string assigned to scope', inject(function($rootScope,$controller){
    var scope = $rootScope.$new();
    var ctrl = $controller('FruitController', {$scope: scope});
    expect(scope.test).toBe("test");
  })
      );
    
  it('returns a fruitArray with two elements', inject(function($rootScope, $controller) {
    var scope = $rootScope.$new();
    var ctrl = $controller('FruitController', {$scope: scope, FruitFactory:mockFruits });
    expect(scope.fruits.length).toBe(2);
    expect(scope.fruits[0]).toBe('apple');
    scope.addFruit('banana');
    expect(scope.fruits.length).toBe(3);
    })
  );

});

