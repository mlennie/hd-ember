import Ember from 'ember';

export default Ember.Component.extend({
	initializeCalendar: function() {
      return Ember.$("#calendar").fullCalendar(
      );
    }.on("didInsertElement")
});
