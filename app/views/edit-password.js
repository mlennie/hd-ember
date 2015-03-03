import Ember from 'ember';

export default Ember.View.extend({
  setHtmlBackgroundColor: function() {
  	Ember.$('html').css('background-color', '#ECECEC');
  }.on('didInsertElement')
});
