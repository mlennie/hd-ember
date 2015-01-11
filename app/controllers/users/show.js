import Ember from 'ember';
export default Ember.Controller.extend({
	//computed properties
  currentUser: function() {
    return this.get('session.currentUser');
  }.property('session.currentUser'),
	email: function(){
		return this.get('currentUser.email');
	}.property('currentUser.email'),
	firstName: function(){
		return this.get('currentUser.firstName');
	}.property('currentUser.email'),
	lastName: function(){
		return this.get('currentUser.lastName');
	}.property('currentUser.lastName'),
	isOwner: function() {
		return this.get('currentUser.isOwner');
	}.property('currentUser.isOwner'),
	restaurant: function() {
		var restaurants = this.get('currentUser.restaurants');
		return restaurants.get('firstObject');
	}.property('currentUser.restaurants')
});