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

	showTopSearchBar: function() {
    var path = this.get('controller.currentPath');
    if (path !== 'index' && 
      path !== 'conditions-generales' &&
      path !== 'faq' &&
      path !== 'remerciements') {
      Ember.$('#top-search-bar').show();
    } else {
      Ember.$('#top-search-bar').hide();
    }
	}.on('didInsertElement').observes('controller.currentPath', 'controller.session'),

	//send events to MIXPANEL
	applicationMixpanelEvents: function() {

		//MIXPANEL: Identify user if signed in NOTE: user is identified here if 
		//app reloads
		if (this.get('controller.session.user_id') !== undefined) {
			mixpanel.identify(this.get('controller.session.user_id'));
		}

		//navbar events
		//logged in
		//MIXPANEL: Add Mon Compte link click event
		Ember.$('body').on('click', '#mon-compte-dropdown', function() {
	    mixpanel.track('Mon Compte Link Click', { 
	    	'location': 'navbar'
	    });
		});

		//MIXPANEL: Add Mon Profile nav link click event
		Ember.$('body').on('click', '#welcome-page-nav-link', function() {
	    mixpanel.track("Page d'accueil Link Click", { 
	    	'location': 'navbar'
	    });
		});

		//MIXPANEL: Add Mon Profile nav link click event
		Ember.$('body').on('click', '#mon-profile-nav-link', function() {
	    mixpanel.track('Mon Profile Link Click', { 
	    	'location': 'navbar'
	    });
		});

		//MIXPANEL: Add Mes Euros nav link click event
		Ember.$('body').on('click', '#mes-euros-nav-link', function() {
	    mixpanel.track('Mes Euros Link Click', { 
	    	'location': 'navbar'
	    });
		});

		//MIXPANEL: Add Parrainer nav link click event
		Ember.$('body').on('click', '#parrainer-nav-link', function() {
	    mixpanel.track('Parrainer Link Click', { 
	    	'location': 'navbar'
	    });
		});

		//MIXPANEL: Add Logout click event
		Ember.$('body').on('click', '#logout-link', function() {
	    mixpanel.track('Logout', { 
	    	'location': 'navbar'
	    });
		});

		//not logged in
		//MIXPANEL: Add concept link click event
		Ember.$('body').on('click', '#connection-button', function() {
	    mixpanel.track('Concept Link Click', { 
	    	'location': 'navbar'
	    });
		});

		//MIXPANEL: Add inscription nav bar link click event
		Ember.$('body').on('click', '#inscription-nav-link', function() {
	    mixpanel.track('Inscription Nav Link Click', { 
	    	'location': 'nav bar' 
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
        'restaurant': Ember.$(this).data('name')
      });
    });

    //MIXPANEL: retour links(search results and restaurant page)
     Ember.$('body').on('click', '.back-link', function() {
      mixpanel.track('Retour Link Click', { 
        'page': Ember.$(this).data('page')
      });
    });

    //
    //USERS PAGES
    //
    //MIXPANEL: Add Mes Euros link click event
		Ember.$('body').on('click', '#users-mes-euros-link', function() {
	    mixpanel.track('Mes Euros Link Click', { 
	    	'location': 'users pages left vertical navbar'
	    });
		});

		//MIXPANEL: Add Mes Euros link click event
		Ember.$('body').on('click', '#users-mon-profil-link', function() {
	    mixpanel.track('Mon Profil Link Click', { 
	    	'location': 'users pages left vertical navbar'
	    });
		});

		//MIXPANEL: Add Mes Euros link click event
		Ember.$('body').on('click', '#users-parrainer-link', function() {
	    mixpanel.track('Parrainer Link Click', { 
	    	'location': 'users pages left vertical navbar'
	    });
		});
	}.on('didInsertElement')
});
