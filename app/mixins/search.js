import Ember from "ember";
export default Ember.Mixin.create({
	name: null,
	names: function() {
		var arrond = ['75017', '75008'];
		var names = this.get('model').getEach('name');
		return arrond.concat(names);
	}.property(),
	cuisines: ['Type de cuisine', 'French', 'Italian', 'World'],
	date: '',
	//setup hours to be shown for select box
	hours: ['12:00', '12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00',
					'16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00',
					'20:30','21:00','21:30','22:00','22:30','23:00','23:30'],
	couverts: ['Nombre de couverts', 1, 2, 3, 4, 5, 6, 7, 8, 9],
	actions: {
		search: function() {
    	window.scrollTo(0, 0);
			this.transitionToRoute('restaurants.search-results', {queryParams: {name: this.get('name')}});
		}
	}
});