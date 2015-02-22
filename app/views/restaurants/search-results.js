import Ember from 'ember';

export default Ember.View.extend({
	handlePopovers: function(){

    //close popovers when click anywhere
    Ember.$('body').on('click', function() {
      Ember.$('*[data-toggle="popover"]').popover();
      Ember.$('*[data-toggle="popover"]').popover('hide');
    });

    //open popover and close other popovers
    Ember.$('body').on('click', '*[data-toggle="popover"]', function(event) {
      event.preventDefault();
      event.stopPropagation();
      Ember.$('*[data-toggle="popover"]').not(this).popover('hide');
      Ember.$(this).popover();
      Ember.$(this).popover('show');
      Ember.$(this).popover().css('z-index', -5);
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
