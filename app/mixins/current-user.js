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
		return this.get('currentUser.isOwner');
	}.property('currentUser.isOwner'),
	restaurant: function() {
		var restaurants = this.get('currentUser.restaurants');
		return restaurants.get('firstObject');
	}.property('currentUser.restaurants'),
	referralCodeUrl: function() {
		var url = ENV.APP.EMBER_URL;
		var registerUrl = url + '/register';
		var referral_code = this.get('currentUser.referralCode');
		return registerUrl + '?referralCode=' + referral_code;
	}.property('currentUser'),
	emailReferralMessage: function() {
		var mail = "mailto:yourfriends@mail.com?";
		var subject = "subject=Eat out with Happy Dining!&";
		var body = "body=Please sign up for happy dining. You get money for eating out and if you sign up I get money too!";
		var link = "Just click here: " + this.get('referralCodeUrl'); 
		return mail + subject + body + link;
	}.property('referralCodeUrl'),

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