import Ember from "ember";
export default Ember.Mixin.create({

	//properties
	//set initial search options to be null
	name: null,
	cuisine: undefined,
	date: null,
	time: null, 
	number: null,
	datesRequired: false,

	//computed properties

	//decide whether cuisine should be disabled of not
	isDisabled: function() {

		//get name of restaurant
		var name = this.get('name');

		//make cusine select disabled unless 
		//arrondisment or nothing is chosen for name
		if (
			name === '75017' ||
			name === '75008' ||
			name === null
			) {
			return false;
		} else {
			this.set('cuisine', undefined);
			return true;
		}
	}.property('name'),

	//check to make sure date, time and number of people are required
	//if one is selected
	checkIfDatesRequired: function() {
		if (
			this.get('date') !== null && 
			this.get('date') !== "" &&
			this.get('date') !== undefined ||
			this.get('time') !== null ||
			this.get('number') !== null
		) {
			this.set('datesRequired', true);
		} else {
			this.set('datesRequired', false);
		}
	}.observes('date', 'time', 'number'),

	//setup names to be shown for select box
	names: function() {
		var arrond = ['75017', '75008'];
		var names = this.get('model').getEach('name');
		return arrond.concat(names);
	}.property('model'),

	//setup cuisines to be shown for select box
	cuisines: function() {
		return this.store.all('cuisine').getEach('name');
	}.property('model'),
	
	//setup hours to be shown for select box
	hours: ['13:00','13:30','14:00','14:30','15:00','15:30','16:00',
					'16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00',
					'20:30','21:00','21:30','22:00','22:30','23:00','23:30'],

	//setup number of people to be shown for select box
	couverts: [1, 2, 3, 4, 5, 6, 7, 8, 9],

	//actions
	actions: {

		//when search button clicked go to search results page
		//with query params that were selected
		search: function() {
			//reset page location to top of page
    	window.scrollTo(0, 0);
    	//get name of restaurant
			var name = this.get('name');
    	//go to search results page and list restaurants that match criteria 
    	//if specific restaurant has not been picked
    	if (
				name === '75017' ||
				name === '75008' ||
				name === null
			) {
				this.transitionToRoute(
					'restaurants.search-results', 
					{ queryParams: { 
						name: this.get('name'), 
						cuisine: this.get('cuisine'),
						date: this.get('date'),
						time: this.get('time'),
						number: this.get('number')
					}}
				);
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
						cuisine: this.get('cuisine'),
						date: this.get('date'),
						time: this.get('time'),
						number: this.get('number')
					}}
				);
			}
		}
	}
});