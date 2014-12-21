import Ember from 'ember';

export default Ember.Controller.extend({
	restaurants: ['Restaurant, lieu','blue nile', 'fouquets'],
	cuisines: ['Type de cuisine', 'French', 'Italian', 'World'],
	date: '',
	hours: ['Heure','1h','2h'],
	couverts: ['Nombre de couverts', 1, 2, 3, 4, 5, 6, 7, 8, 9]
});
