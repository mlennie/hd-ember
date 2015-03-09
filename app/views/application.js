import Ember from 'ember';

export default Ember.View.extend({
	jqueryEvents: function(){
   	Ember.$('body').on('click', '*[data-toggle="popover"]', function() {
      Ember.$(this).popover();
      Ember.$(this).popover('show');
   	});
	}.observes('controller.filteredRestaurants').on('didInsertElement'),

	//close collapsable navbar dropdown when 
	closeNavbar: function() {
		Ember.$('html').on('click', '.navbar-collapse', function(){
    	Ember.$(".navbar-collapse").collapse('hide');
		});
	}.on('didInsertElement'),

	//send events to MIXPANEL
	applicationMixpanelEvents: function() {

		//get controller
		var controller = this.controller;

		//navbar events
		//MIXPANEL: Add concept link click event
		Ember.$('body').on('click', '#connection-button', function() {
	    mixpanel.track('Concept Link Click', { 
	    	'location': 'navbar',
	    	'page': controller.get('currentPath') 
	    });
		});

		//MIXPANEL: Add inscription nav bar link click event
		Ember.$('body').on('click', '#inscription-nav-link', function() {
	    mixpanel.track('Inscription Nav Link Click', { 
	    	'location': 'nav bar',
	    	'page': 'multiple'  
	    });
		});

		//footer events
		//MIXPANEL: Add CGU link click event
		Ember.$('body').on('click', '#conditions-generales', function() {
			
			//MIXPANEL: Identify user if signed in
			if (controller.get('session.user_id') !== undefined) {
				mixpanel.identify(controller.get('session.user_id'));
			}
			
	    mixpanel.track('CGU Link Click', { 
	    	'location': 'footer' 
	    });
		});
	}.on('didInsertElement')
});
