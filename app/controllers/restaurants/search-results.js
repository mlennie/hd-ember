import Ember from 'ember';

export default Ember.Controller.extend({
	
  //properties
  queryParams: ['name'],
  name: null,

  //computed properties

  randomSortBy: function() {
    var input = ['name', 'street', 'imgUrl', 'description'];
     
    for (var i = input.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input.get('firstObject');
  }.property('model', 'name'),

  shuffledRestaurants: function() {
    return this.get('model').sortBy(this.get('randomSortBy'));
  }.property('randomSortBy'),
  

  filteredRestaurants: function() {
    var name = this.get('name');
    var restaurants = this.get('shuffledRestaurants');


    if (name === '75017' || name === '75008') {
      return restaurants.filterBy('zipcode', name);
    } else {
      return restaurants.filterBy('name', name);
    }
  }.property('name', 'model'),

  //get length of filtered restaurants
  filteredRestaurantsLength: function() {
    return this.get('filteredRestaurants.length');
  }.property('filteredRestaurants'),

  nonFilteredRestaurants: function() {
    var name = this.get('name');
    var restaurants = this.get('shuffledRestaurants');

    if (name === '75017' || name === '75008') {
      return restaurants.rejectBy('zipcode', name);
    } else {
      return restaurants.rejectBy('name', name);
    }
  }.property('name', 'model'),
  hasFilteredRestaurants: function() {
    return this.get('filteredRestaurants.length') > 0;
  }.property('filteredRestaurants')
});
