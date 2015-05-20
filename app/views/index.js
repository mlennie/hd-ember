import Ember from 'ember';

export default Ember.View.extend({
	classNames: ['special-height'],

	//send events to MIXPANEL
	indexMixpanelEvents: function() {
		var _this = this;

		Ember.$('body').on('click', '#middle-register-button', function() {
			//MIXPANEL: Add inscription button click event
	    mixpanel.track('Inscription Button Click', { 
	    	'color': 'gold',
	    	'location': 'middle',
	    	'page': 'index'  
	    });
		});

		Ember.$('body').on('click', '#concept-button', function() {
			//MIXPANEL: Identify user
				mixpanel.identify(_this.get('controller.session.user_id'));
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
