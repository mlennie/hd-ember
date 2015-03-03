import Ember from "ember";
export default Ember.Mixin.create({

	//PROPERTIES
	name: null,
	zipcodes: ['75016','75017','75008'],
	cuisines: ['Type de cuisine', 'French', 'Italian', 'World'],
	date: null,
	//setup hours to be shown for select box
	hours: ['12:00', '12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00',
					'16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00',
					'20:30','21:00','21:30','22:00','22:30','23:00','23:30'],
	couverts: ['Nombre de couverts', 1, 2, 3, 4, 5, 6, 7, 8, 9],


	//COMPUTED PROPERTIES

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

	//ACTIONS
	actions: {
		search: function() {
    	window.scrollTo(0, 0);
			this.transitionToRoute('restaurants.search-results', {queryParams: {name: this.get('name')}});
		},
		filterByZipcode: function(zipcode) {
			return this.get('sortedRestaurants').filterBy('zipcode', zipcode);
		}
	}
});