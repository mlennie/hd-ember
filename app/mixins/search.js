import Ember from "ember";
export default Ember.Mixin.create({

	needs: "restaurants/search-results",
  searchResults: Ember.computed.alias("controllers.restaurants/search-results"),

	//properties
	//set initial search options to be null
	name: null,
	cuisine: undefined,
	hour: null,
	nbCouverts: null,
	date: null,
	time: null, 
	cuisineDisabled: false,
	number: null,
	couverts: [1, 2, 3, 4, 5, 6],
	zipcodes: ['75016','75017','75008', '75004', '75006', '75007', '75015'],
	//setup hours to be shown for select box
	hours: ['12:00', '12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00',
					'16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00',
					'20:30','21:00','21:30','22:00','22:30','23:00','23:30'],

	//COMPUTED PROPERTIES

	//decide whether cuisine should be disabled of not
	setCuisineDisabled: function() {

		//get name of restaurant
		var name = this.get('name');

		//make cusine select disabled unless 
		//arrondisment or nothing is chosen for name
		if (
			this.get('zipcodes').indexOf(name) != -1 ||
			name === null
			) {
			this.set('cuisineDisabled', false);
		} else {
			this.set('cuisine', undefined);
			this.set('cuisineDisabled', true);		
		}
	}.observes('name', 'date', 'number'),

	//check to make sure date, time and number of people are required
	//if one is selected
	dateTimeNumberRequired: function() {
		if (
			(!this.get('dateEmpty') && (this.get('hourEmpty') || this.get('numberEmpty'))) ||
			(!this.get('hourEmpty') && (this.get('dateEmpty') || this.get('numberEmpty'))) ||
			(!this.get('numberEmpty') && (this.get('hourEmpty') || this.get('dateEmpty')))
		) {
			return true;
		} else {
			return false;
		}
	}.property('dateEmpty', 'hourEmpty', 'numberEmpty'),

	//setup cuisines to be shown for select box
	cuisines: function() {
		return this.store.all('cuisine').getEach('name');
	}.property('model'),

	//sort restaurants by name
	sortedRestaurants: function() {
		return this.get('model').sortBy('name');
	}.property('model'),

	//get zipcodes and restaurant names
	names: function() {
		var fullList = [];
		var zipcodes = this.get('zipcodes');

		//sort restaurants by zipcode first and then restaurant names alphabetically
		//per zipcode
		for (var i = 0; i < zipcodes.length; i++) {
			//get names per zipcode
			var restaurants = this.get('sortedRestaurants').filterBy('zipcode', zipcodes[i]);
			var names = restaurants.getEach('name');

			//update list with zipcode and names for current zipcode in loop
			if (names.length !== 0) {
				fullList.push(zipcodes[i]);
				Array.prototype.push.apply(fullList, names);
			}

		}
		return fullList;
	}.property('sortedRestaurants'),

	//MIXPANEL HELPERS
	//check if date is empty
	dateEmpty: function() {
		return this.get('date') === null || this.get('date') === undefined;
	}.property('date'),

	//check if hour is empty
	hourEmpty: function() {
		return this.get('time') === null || this.get('time') === undefined;
	}.property('time'),

	//check if nbCouverts is empty
	numberEmpty: function() {
		var c = this.get('number');
		return c === null || c === undefined;
	}.property('number'),

	//check if name is empty
	nameEmpty: function() {
		return this.get('name') === null || this.get('name') === undefined;
	}.property('name'),

	//ACTIONS
	actions: {

		//when search button clicked go to search results page
		//with query params that were selected
		search: function() {
				
			//reset page location to top of page
    	window.scrollTo(0, 0);
    	
    	//check and show error if one of date time or number is selected 
    	//but not all are selected
    	if (this.get('dateTimeNumberRequired')) {
    		alert('Veuillez choisir une date, un horaire et le nombre de ' +
    			    'couvert(s), ou laisser ces 3 champs libres');
    	} else {

	    	//MIXPANEL: restaurant search button click event
		    mixpanel.track('Restaurant Search Button Click', { 
		    	"location": "logged in home page not mobile",
		    	"page": this.get('currentPath'),
		    	"date empty?": this.get('dateEmpty'),
		    	"date": this.get('date'),
		    	"hour empty?": this.get('hourEmpty'),
		    	"hour": this.get('hour'),
		    	"nbCouverts empty?": this.get('numberEmpty'),
		    	"nbCouverts": this.get('number'),
		    	"location empty?": this.get('nameEmpty'),
		    	"Restaurant location": this.get('name')
		    });

	    	//get name of restaurant
				var name = this.get('name');
	    	//go to search results page and list restaurants that match criteria 
	    	//if specific restaurant has not been picked
	    	if (
					this.get('zipcodes').indexOf(name) != -1 ||
					name === null
				) {
					var params = {
						name: this.get('name'),
						cuisine: this.get('cuisine'),
						date: this.get('date'),
						time: this.get('time'),
						number: this.get('number')
					}
					//make sure page is on search results
					this.transitionToRoute('restaurants.search-results');
					//call action to update search results
					this.get('searchResults').send('updateSearchResults', params);
				//else go to the specific restaurant page that was picked
				//and send chosen query params so that can look up service times with that
				} else {
					//get restaurant id by name 
					var filteredRestaurants = this.get('model').filterBy('name', name);
	    		var restaurantId = filteredRestaurants.get('firstObject').get('id');
					//transition to restaurant page
					this.transitionToRoute(
						'restaurants.show',
						restaurantId,
						{ queryParams: { 
							cuisine: this.get('cuisine') == null ? undefined : this.get('cuisine'),
							date: this.get('date') == undefined ? null : this.get('date'),
							time: this.get('time') == undefined ? null : this.get('time'),
							number: this.get('number') == undefined ? null : this.get('number')
						}}
					);
				}		
			}
		}
	}
});