import Ember from 'ember';

export default Ember.Controller.extend({
  //properties
  showReserveButton: true,

	//computed properties
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
