import Ember from 'ember';

export default Ember.View.extend({
	classNames: ['special-height'],

	//scroll to concept part of page when concept link clicked
	scrollToConcept: function() {
		if (this.controller.get('concept') === 'true') {
			Ember.$('html, body').animate({
	        scrollTop: Ember.$("#concept").offset().top
	    }, 750);
		}
	}.on('didInsertElement'),

	//send events to MIXPANEL
	indexMixpanelEvents: function() {
		Ember.$('body').on('click', '#middle-register-button', function() {
			//MIXPANEL: Add inscription button click event
	    mixpanel.track('Inscription Button Click', { 
	    	'color': 'gold',
	    	'location': 'middle',
	    	'page': 'index'  
	    });
		});

		Ember.$('body').on('click', '#concept-button', function() {
			//MIXPANEL: Add concept button click event
	    mixpanel.track('Concept Button Click', { 
	    	'color': 'black transparent',
	    	'location': 'under search',
	    	'page': 'index',
	    	'connected': 'yes'  
	    });
		});
	}.on('didInsertElement')
});
