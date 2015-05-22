import Ember from 'ember';
import ENV from "hd-ember/config/environment";
export default Ember.Controller.extend({

  needs: "application",
  application: Ember.computed.alias("controllers.application"),

  //properties
	queryParams: ['name', 'cuisine', 'time', 'date'],
  name: null,
  date: null,
  time: null,
  cuisine: undefined,
  loading: false,
  sortBy: 'street',

  //computed properties

  filteredRestaurants: function() {
    return this.get('shuffledRestaurants');
  }.property(),

  shuffledRestaurants: function() {
    return this.get('model').sortBy(this.get('sortBy'));
  }.property('sortBy'),

  //get length of filtered restaurants
  filteredRestaurantsLength: function() {
    return this.get('filteredRestaurants.length');
  }.property('filteredRestaurants'),

  nonFilteredRestaurants: function() {
    var controller = this;

    //take filtered restaurants out of resteraunts
    return this.get('shuffledRestaurants').filter(function(r) {
      var filteredRestaurants = controller.get('filteredRestaurants');
      if (filteredRestaurants) {
        var names = filteredRestaurants.getEach('name');
        return !(names.indexOf(r.get('name')) > -1);
      } else {
        return true;
      }
    });

  }.property('filteredRestaurants'),

  hasFilteredRestaurants: function() {
    return this.get('filteredRestaurants.length') > 0;
  }.property('filteredRestaurants'),

  actions: {

    updateSearchResults: function(params) {
      //randomize results
      this.send('changeSortBy');

      //set variables
      var _this = this;   
      var name = params.name;
      var cuisine = params.cuisine;
      var date = params.date;
      var time = params.time;
      var number = params.number;
      var restaurants = this.get('shuffledRestaurants');

      //set loading spinner
      _this.set('loading', true);

      //filter by restaurant name
      if (name !== null) {
        if (name === '75017' || name === '75008' || name === '75016') {
          restaurants = restaurants.filterBy('zipcode', name);
        } else {
          restaurants = restaurants.filterBy('name', name);
        }
      }

      //filter by restaurant cuisine
      if (cuisine !== undefined) {
        restaurants = restaurants.filter(function(r) {
          var cuisines = r.get('cuisines');
          cuisines = cuisines.filterBy('name', cuisine );
          return cuisines.length > 0;
        });
      } 

      //if date or time is present filter restaurants by their services that match
      //those times

      if (date !== null) {
        //filter on rails side so we don't have to bring all services 
        //over at once

        //get restaurant ids
        var restaurant_ids = restaurants.map(function(restaurant) {
          return restaurant.id;
        });

        // Custom ajax call for filtering restaurants                                                           
        Ember.$.ajax({                                                                                                                      
          url: ENV.APP.HOST + '/restaurants',                                                               
          type: 'GET',                                                                                                 
          data: {date: date, time: time, ids: restaurant_ids }                                                                                   
        }).then(function(data){                                                                               
          restaurant_ids = data.restaurant_ids;
          //filter
          restaurants = restaurants.filter(function(restaurant) {
            return restaurant_ids.indexOf(+restaurant.id) != -1;
          });

          //return filtered restaurants
          _this.set('filteredRestaurants', restaurants); 
          //remove loading spinner
          _this.set('loading', false);                                                                        
        }, function(data){                                                                                               
          debugger;
          //remove loading spinner
          _this.set('loading', false);                                                                                     
        });   

      } else { //don't filter by date or time
        //return filtered restaurants
        _this.set('filteredRestaurants', restaurants);
        //remove loading spinner
        _this.set('loading', false);
      }
    },

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
    },

    //go to restaurant page based on given restaurant id 
    //and go to reservation part whether reserve param was passed or not
    goToRestaurant: function(restaurantId, reserve) {

      //reset search properties from application's search mixin
      this.get('application').setProperties({
        name: null,
        cuisine: undefined,
        time: null,
        nbCouverts: null,
        date: null,
        number: null
      });

      //transition to restaurant page
      this.transitionToRoute(
        'restaurants.show',
        restaurantId,
        { queryParams: { 
          cuisine: null,
          date: null,
          time: null,
          number: null,
          discount: null,
          reserve: reserve
        }}
      );
    }
  }
});












