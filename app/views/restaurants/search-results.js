import Ember from 'ember';

export default Ember.View.extend({
	jqueryEvents: function(){
    Ember.$('[data-toggle="popover"]').popover().click(function( event ) {
  		event.preventDefault();
  		event.stopPropagation();
  	});
  }.observes('controller.filteredRestaurants').on('didInsertElement')
});
