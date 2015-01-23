import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['date', 'time', 'number', 'name'],
  
  //properties
  date: null,
  time: null,
  number: null,
  name: null,

  //actions
  actions: {
  	confirmReservation: function() {
  		var reservation = this.store.createRecord('reservation', {
  			nbPeople: this.get('number'),
  			time: null,
  			restaurant: this.get('model'),
  			user: this.get('session.currentUser'),
  			service: null,
  			discount: 0.10,
  			userContribution: 0,
  			bookingName: this.get('name')
  		});
  		reservation.save();
  	}
  }
});