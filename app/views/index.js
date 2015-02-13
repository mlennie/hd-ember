import Ember from 'ember';

export default Ember.View.extend({
	classNames: ['special-height'],
	
	formatSearchFields: function(){
   	Ember.$("#date").mask("99/99/99",{placeholder:"mm/dd/yy"});
	}.on('didInsertElement'),

	//scroll to concept part of page when concept link clicked
	scrollToConcept: function() {
		if (this.controller.get('concept') === 'true') {
			Ember.$('html, body').animate({
	        scrollTop: Ember.$("#concept").offset().top
	    }, 750);
		}
	}.on('didInsertElement')
});
