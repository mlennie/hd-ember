import Ember from 'ember';

export default Ember.View.extend({
	jqueryEvents: function(){
    Ember.$('[data-toggle="popover"]').popover();
  }.on('didInsertElement')
});
