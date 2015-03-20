import Ember from 'ember';
export default Ember.Controller.extend({
	//queryParams
  queryParams: ['unsubscription'],

  //properties
  unsubscription: null,

  //computed properties
  showSuccess: function() {
    return this.get('unsubscription') === 'success';
  }.property('unsubscription'),

  showFailure: function() {
    return this.get('unsubscription') !== 'success';
  }.property('unsubscription')
});