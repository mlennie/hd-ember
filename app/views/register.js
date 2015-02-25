import Ember from 'ember';

export default Ember.View.extend({

	setReferralCode: function() {
    var referralCode = this.controller.get('referralCode');
    if (referralCode !== null) {
	    var cookie = this.get('cookie');
	    cookie.setCookie('referralCode', referralCode);
	  }
  }.on('didInsertElement'),

  setHtmlBackgroundColor: function() {
  	Ember.$('html').css('background-color', '#ECECEC');
  }.on('didInsertElement')
});
