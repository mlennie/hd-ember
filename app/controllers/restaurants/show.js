import Ember from 'ember';

export default Ember.Controller.extend({
  //properties
  showReserveButton: true,

	//computed properties
  backgroundUrl: function() {
    return 'background-image: url(' + this.get('model.imgUrl')+');';
  }.property('model'),
  fullAddress: function() {
    var street = this.get('model.street');
    var city = this.get('model.city');
    var zipcode = this.get('model.zipcode');
    return street + ', ' + city + ', ' + zipcode;
  }.property('model'),

  //actions
  actions: {
    showPhoneNumber: function() {
      this.set('showReserveButton', false);
    }
  }
});
