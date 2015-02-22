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

	//style ou form select values
	styleOuSearchSelect: function() {
		Ember.$('name-select > option').val('75017').css('font-weight', 900);
	}.on('didInsertElement')
});
