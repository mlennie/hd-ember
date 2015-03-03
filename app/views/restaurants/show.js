import Ember from 'ember';

export default Ember.View.extend({
	jqueryEvents: function(){
    //close popovers when click anywhere
    Ember.$('body').on('click', function() {
      Ember.$('*[data-toggle="popover-show"]').popover();
      Ember.$('*[data-toggle="popover-show"]').popover('hide');
    });

    //open popover and close other popovers
    Ember.$('body').on('click', '*[data-toggle="popover-show"]', function(event) {
      event.preventDefault();
      event.stopPropagation();
      Ember.$(this).popover();
      Ember.$(this).popover('show');    
    });
  }.on('didInsertElement')
});
