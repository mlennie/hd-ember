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

		//MIXPANEL: Identify user if signed in NOTE: user is identified here if 
		//app reloads
		if (controller.get('session.user_id') !== undefined) {
			mixpanel.identify(controller.get('session.user_id'));
		}

		//navbar events
		//logged in
		//MIXPANEL: Add Mon Compte link click event
		Ember.$('body').on('click', '#mon-compte-dropdown', function() {
	    mixpanel.track('Mon Compte Link Click', { 
	    	'location': 'navbar',
	    	'page': controller.get('currentPath') 
	    });
		});

		//MIXPANEL: Add Mon Profile nav link click event
		Ember.$('body').on('click', '#mon-profile-nav-link', function() {
	    mixpanel.track('Mon Profile Link Click', { 
	    	'location': 'navbar',
	    	'page': controller.get('currentPath') 
	    });
		});

		//MIXPANEL: Add Mes Euros nav link click event
		Ember.$('body').on('click', '#mes-euros-nav-link', function() {
	    mixpanel.track('Mes Euros Link Click', { 
	    	'location': 'navbar',
	    	'page': controller.get('currentPath') 
	    });
		});

		//MIXPANEL: Add Parrainer nav link click event
		Ember.$('body').on('click', '#parrainer-nav-link', function() {
	    mixpanel.track('Parrainer Link Click', { 
	    	'location': 'navbar',
	    	'page': controller.get('currentPath') 
	    });
		});

		//not logged in
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
	    mixpanel.track('CGU Link Click', { 
	    	'location': 'footer' 
	    });
		});

		//Search Results Page
		//added here because was sending multiple events when adding to search 
		//results view

		//MIXPANEL: Add Mon Compte link click event
    Ember.$('body').on('click', '#search-result-link', function() {
      //MIXPANEL: Add Search Results Page Restaurant Click Event
      mixpanel.track('Restaurant Click', { 
        'restaurant': Ember.$(this).data('name'),
        'page': controller.get('currentPath')
      });
    });
	}.on('didInsertElement')
});
