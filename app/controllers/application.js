import Ember from 'ember';

export default Ember.Controller.extend({
	name: '',
	names: function() {
		return this.get('model').getEach('name');
	}.property(),
	cuisines: ['Type de cuisine', 'French', 'Italian', 'World'],
	date: '',
	hours: ['Heure','1h','2h'],
	couverts: ['Nombre de couverts', 1, 2, 3, 4, 5, 6, 7, 8, 9],
	actions: {
		search: function() {
			this.transitionTo('results', {queryParams: {name: this.get('name')}});
		}
	}
});
