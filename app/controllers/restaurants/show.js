import Ember from 'ember';

export default Ember.Controller.extend({
  //properties
  showReserveButton: true,

	//computed properties
  backgroundUrl: function() {
    return 'background-image: url(' + this.get('model.imgUrl')+');';
  }.property('model'),
  
  services: function() {
    var restaurant_id = this.get('model.id');
    return this.store.find('service', { restaurant_id: restaurant_id });
  }.property('model'),

  //actions
  actions: {
    showPhoneNumber: function() {
      this.set('showReserveButton', false);
    }
  }
});
