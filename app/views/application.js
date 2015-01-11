import Ember from 'ember';

export default Ember.View.extend({
	jqueryEvents: function(){
   	Ember.$('body').on('click', '*[data-toggle="popover"]', function() {
      $(this).popover();
      $(this).popover('show');
   	});
	}.observes('controller.filteredRestaurants').on('didInsertElement')
});
