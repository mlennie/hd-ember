import Ember from "ember";
import ENV from "hd-ember/config/environment";
export default Ember.Mixin.create({

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
		return this.get('session.isOwner');
	}.property('session'),
	restaurant: function() {
		var restaurants = this.get('currentUser.restaurants');
		return restaurants.get('firstObject');
	}.property('currentUser.restaurants'),
	gender: function() {
		return this.get('currentUser.gender');
	}.property('currentUser.gender'),

	//wallet
  wallet: function() {
    return this.get('currentUser.wallet');
  }.property('currentUser.wallet'),
  balance: function() {
  	if (this.get('currentUser.balance')) {
  		return this.get('currentUser.balance');
  	} else {
    	return this.get('wallet.balance');
    }
  }.property('wallet.balance'),
  hasBalance: function() {
    return this.get('balance') != null;
  }.property('balance'),
  reservations: function() {
  	return this.get('currentUser.reservations');
  }.property('currentUser')
});