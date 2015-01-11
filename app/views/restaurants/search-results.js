import Ember from 'ember';

export default Ember.View.extend({
	jqueryEvents: function(){
    Ember.$('[data-toggle="popover"]').popover();
  }.observes('controller.filteredRestaurants').on('didInsertElement')
});
