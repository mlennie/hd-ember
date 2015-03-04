import Ember from 'ember';

export default Ember.View.extend({

  setHtmlBackgroundColor: function() {
  	Ember.$('html').css('background-color', '#ECECEC');
  }.on('didInsertElement'),

  //send events to MIXPANEL
	loginMixpanelEvents: function() {

		var controller = this.controller;

		//MIXPANEL: Add remember me checkbox select event
		Ember.$('body').on('click', '#remember-me', function() {
	    mixpanel.track('Se Souvenir De Moi Select');
		});

	}.on('didInsertElement')
});
