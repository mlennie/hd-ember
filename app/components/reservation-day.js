import Ember from 'ember';

export default Ember.Component.extend({

	//computed properties
	owner: function() {
		return this.store.all('user', this.get('session.user_id'));
	}.property(),

	restaurant: function() {
		var r = this.store.all('restaurant', {user_id: this.get('owner')});
		r = r.get('firstObject');
		return r;
	}.property()
});
