import Ember from 'ember';
export default Ember.Controller.extend({

	//computed properties

  //user
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

  //wallet
  wallet: function() {
    return this.get('currentUser.wallet');
  }.property('currentUser.wallet'),
  balance: function() {
    return this.get('wallet.balance');
  }.property('wallet.balance'),
  hasBalance: function() {
    return this.get('balance') != null;
  }.property('balance')
});