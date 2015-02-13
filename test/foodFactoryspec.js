describe('FruitFactory tests', function() {
  var factory;

  beforeEach(function() {
    module('fruitApp');

    inject(function(FruitFactory){
      factory = FruitFactory;
    });
    fruits = {
      fruit1: 'apple',
      fruit2: 'banana',
      fruit3: 'pear'
      };
    Object.defineProperty(window, 'sessionStorage', {
      value: mock,
      configurable:true,
      enumerable:true,
      writable:true 
    });

    spyOn(localStorage, 'getItem').andCallFake(function(key) {
      return fruits[key];
    });
 
    spyOn(localStorage, 'setItem').andCallFake(function(key, value) {
      return fruits[key] = value + '';
    });
 
    spyOn(localStorage, 'clear').andCallFake(function() {
      fruits = {};
    });
 
    spyOn(Object, 'keys').andCallFake(function(value) {
      var keys=[];
 
      for(var key in fruits) {
        keys.push(key);
      }
 
      return keys;
    });

  });

  it('has a get function', function() {
    expect(angular.isFunction(factory.get)).toBe(true);
    expect(angular.isFunction(factory.put)).toBe(true);
  });
  it('should return 2 fruit initially', function() {
    var result = factory.get();
    expect(result.length).toBe(3);
  });
  it('shoud add a fruit', function() {
      factory.put('orange');
      var result= factory.get();
      expect(result.length).toBe(4);
      expect(result[3]).toBe('orange');
  });
});
      
