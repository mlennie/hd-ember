import Ember from 'ember';

export default Ember.View.extend({

	setReferralCode: function() {
    var referralCode = this.controller.get('referral_code');
    if (referralCode !== null) {
	    var cookie = this.get('cookie');
	    cookie.setCookie('referralCode', referralCode);
	  }
  }.on('didInsertElement')
});
