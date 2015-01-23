import Ember from 'ember';

export default Ember.Controller.extend({
  //properties
  showReserveButton: true,

	//computed properties

  services: function() {
    return this.get('model.services');
  }.property('model'),

  serviceStartTimes: function() {
    return this.get('services').getEach('startTime');
  }.property('services'),

  backgroundUrl: function() {
    return 'background-image: url(' + this.get('model.imgUrl')+');';
  }.property('model'),

  //actions
  actions: {
    showPhoneNumber: function() {
      this.set('showReserveButton', false);
    }
  }
});
