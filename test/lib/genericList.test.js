module.exports = function(implementation){
  let assert = require('assert');
  let faker = require('faker');

  let List = require('../../src/list/' + implementation);

  let numberOfItems = faker.random.number()%1000 + 1;
  let arbitraryElement = 'Bunny';

  describe('Generic list behaviour - ' + implementation, function(){

    it('should create an object', function(done){
      let testingList = new List();
      if (typeof testingList == 'object' && testingList instanceof List){
        return done();
      }
        return done(new Error('Not an object'));
    });

    it('should have the given length', function(done){
      let testingList = new List();
      if (testingList.length !== 0){
          return done(new Error('Length is not zero'));
      }
      for (i = 1; i <= numberOfItems; i++){
        testingList.add(arbitraryElement);
        if (testingList.length !== i){
          done(new Error('Length does not increases when adding elements'));
        }
      }
      for (i = numberOfItems - 1; i > 0; i--){
        testingList.unshift();
        if (testingList.length !== i){
          console.log(testingList.length, i);
          done(new Error('Length does not decreases when removing head'));
        }
      }
      let repopulate = function(){
        for (i = 1; i <= numberOfItems; i++){
          console.log(testingList.length);
          testingList.add(arbitraryElement);
        }
      };
      repopulate();
      for (i = numberOfItems - 1; i > 0; i--){
        testingList.pop();
        if (testingList.length !== i){
          done(new Error('Length does not decreases when removing last item'));
        }
      }
      repopulate();
      while(testingList.length > 2){
        testingList.splice(1);
        if (testingList.length !== numberOfItems--){
          done(new Error('Length does not decreases when removing arbitrary item'));
        }
      }
      done();
    });

    it('should find an existing item',function(done){
      let testingList = new List();
      console.log(numberOfItems);
      for (i = 1; i <= numberOfItems; i++){
        testingList.add(i);
        if (!testingList.contains(i)){
          return done(new Error('Item not found.'));
        }
      }
      done();
    });
  });
}
