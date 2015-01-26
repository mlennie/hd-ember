import Ember from "ember";
export default Ember.Mixin.create({
	
	//properties
	//set initial search options to be null
	name: null,
	cuisine: undefined,
	date: null,
	time: null, 
	number: null,

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
	hours: ['Heure','13:00','13:00','14:00','14:30','15:00','15:30','16:00',
					'16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00',
					'20:30','21:00','21:30','22:00','22:30','23:30'],

	//setup number of people to be shown for select box
	couverts: ['Nombre de couverts', 1, 2, 3, 4, 5, 6, 7, 8, 9],

	//actions
	actions: {

		//when search button clicked go to search results page
		//with query params that were selected
		search: function() {
    	window.scrollTo(0, 0);
			this.transitionToRoute('restaurants.search-results', {queryParams: {name: this.get('name'), cuisine: this.get('cuisine')}});
		}
	}
});