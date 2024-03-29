import Ember from 'ember';

export default Ember.View.extend({
	jqueryEvents: function(){
    //close popovers when click anywhere
    Ember.$('body').on('click', function() {
      Ember.$('*[data-toggle="popover-mes-euros"]').popover();
      Ember.$('*[data-toggle="popover-mes-euros"]').popover('hide');
    });

    //open popover and close other popovers
    Ember.$('body').on('click', '*[data-toggle="popover-mes-euros"]', function(event) {
      event.preventDefault();
      event.stopPropagation();
      Ember.$('*[data-toggle="popover-mes-euros"]').not(this).popover('hide');
      Ember.$(this).popover();
      Ember.$(this).popover('show');
      Ember.$(this).popover().css('z-index', -5);
    });
  }.on('didInsertElement')
});