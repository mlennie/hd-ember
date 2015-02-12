import Ember from 'ember';

export default Ember.View.extend({
	jqueryEvents: function(){
    Ember.$('[data-toggle="popover"]').popover().click(function( event ) {
  		event.preventDefault();
  		event.stopPropagation();
  	});
  }.observes('controller.filteredRestaurants').on('didInsertElement'),
  
  //shuffle restaurants and add loading spinner when rechercher is clicked
  resetRestaurantSorting: function(){
  	var controller = this.controller;
  	//add click event
    Ember.$('body').on('click','button#top-search-button', function() {
    	//load spinner and set timeout
    	Ember.$('.load-spinner').css('display', 'block');
	    setTimeout(function(){
	      Ember.$('.load-spinner').css('display', 'none');}, 500);
	    //update sortBy property so restaurants will shuffle
    	controller.send('changeSortBy');
    });
  }.observes('controller.currentPath').on('didInsertElement')
});
