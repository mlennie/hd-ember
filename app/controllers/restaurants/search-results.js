import Ember from 'ember';

export default Ember.Controller.extend({
  itemController: 'restaurants/search-item',
	
  //properties
  queryParams: ['name'],
  name: null,
  sortBy: 'street',

  //computed properties

  randomSortBy: function() {
    this.send('changeSortBy');
  }.observes('model', 'name'),

  shuffledRestaurants: function() {
    return this.get('model').sortBy(this.get('sortBy'));
  }.property('sortBy'),
  

  filteredRestaurants: function() {
    var name = this.get('name');
    var restaurants = this.get('shuffledRestaurants');


    if (name === '75017' || name === '75008' || name === '75016') {
      return restaurants.filterBy('zipcode', name);
    } else if (name !== null) {
      return restaurants.filterBy('name', name);
    } else {
      return restaurants;
    }
  }.property('sortBy'),

  //get length of filtered restaurants
  filteredRestaurantsLength: function() {
    return this.get('filteredRestaurants.length');
  }.property('filteredRestaurants'),

  nonFilteredRestaurants: function() {
    var name = this.get('name');
    var restaurants = this.get('shuffledRestaurants');

    if (name === '75017' || name === '75008' || name === '75016') {
      return restaurants.rejectBy('zipcode', name);
    } else {
      return restaurants.rejectBy('name', name);
    }
  }.property('sortBy'),
  hasFilteredRestaurants: function() {
    return this.get('filteredRestaurants.length') > 0;
  }.property('filteredRestaurants'),

  actions: {
    changeSortBy: function() {
      var input = ['name', 'street', 'imgUrl', 'description', 'id'];
       
      for (var i = input.length-1; i >=0; i--) {
       
          var randomIndex = Math.floor(Math.random()*(i+1)); 
          var itemAtIndex = input[randomIndex]; 
           
          input[randomIndex] = input[i]; 
          input[i] = itemAtIndex;
      }
      this.set('sortBy', input.get('firstObject'));
    },

    clickReserver: function(restaurantName) {
      //MIXPANEL: Add Search Results Reserver Button Click Event
      mixpanel.track('Search Results Page Réserver Button Click', { 
        'restaurant': restaurantName
      });
    }
  }
});
