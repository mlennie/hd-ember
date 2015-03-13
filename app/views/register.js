import Ember from 'ember';

export default Ember.View.extend({

	setReferralCode: function() {
    var referralCode = this.get('controller.referralCode');
    if (referralCode !== null) {

      //facebook had trouble with some referral codes so facebook parrinage 
      //referral code was preceded by "referral". This is then taken out
      //before referralCode is saved to cookies
      if (referralCode.indexOf('referral') !== -1) {
        referralCode = referralCode.replace(/referral/g, '');
      }

	    var cookie = this.get('cookie');
	    cookie.setCookie('referralCode', referralCode);
	  }
  }.on('didInsertElement'),

  setHtmlBackgroundColor: function() {
  	Ember.$('html').css('background-color', '#ECECEC');
  }.on('didInsertElement')
});
