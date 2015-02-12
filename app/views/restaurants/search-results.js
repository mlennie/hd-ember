import Ember from 'ember';

export default Ember.View.extend({
	jqueryEvents: function(){
    Ember.$('[data-toggle="popover"]').popover().click(function( event ) {
  		event.preventDefault();
  		event.stopPropagation();
  	});
  }.observes('controller.filteredRestaurants').on('didInsertElement'),
  
  resetRestaurantSorting: function(){
  	var controller = this.controller;
    Ember.$('button#top-search-button').click(function() {
    	Ember.$('.load-spinner').css('display', 'block');
	    setTimeout(function(){
	      Ember.$('.load-spinner').css('display', 'none');}, 500);
    	controller.send('changeSortBy');
    });
  }.observes('controller.currentPath').on('didInsertElement')
});
