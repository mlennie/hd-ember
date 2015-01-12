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
	hours: ['Heure','13h','13h30','14h','14h30','15h','15h30','16h','16h30','17h',
					'17h30','18h','18h30','19h','19h30','20h','20h30','21h','21h30','22h', 
					'22h30','23h'],
	couverts: ['Nombre de couverts', 1, 2, 3, 4, 5, 6, 7, 8, 9],
	actions: {
		search: function() {
			this.transitionToRoute('restaurants.search-results', {queryParams: {name: this.get('name')}});
		}
	}
});