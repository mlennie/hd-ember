import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['date', 'time', 'number', 'name'],
  
  //properties
  date: null,
  time: null,
  number: null,
  name: null,
  isLoading: false,
  reservationSuccess: false,
  reservationFail: false,

  //actions
  actions: {
  	confirmReservation: function() {
      //show loading spinner
      this.set('isLoading', true);

      //build reservation
  		var reservation = this.store.createRecord('reservation', {
  			nbPeople: this.get('number'),
  			time: new Date(),
  			status: "not_viewed",
  			restaurant: this.get('model'),
  			user: this.get('session.currentUser'),
  			service: null,
  			discount: 0.10,
  			userContribution: 0,
  			bookingName: this.get('name')
  		});

      var controller = this;

      //save reservation
  		reservation.save().then(function(){
        //hide loading spinner
        controller.setProperties({
          isLoading: false,
          reservationSuccess: true,
          reservationFail: false
        });
      }, function() {
        //hide loading spinner
        controller.setProperties({
          isLoading: false,
          reservationSuccess: false,
          reservationFail: true
        });
      });
  	}
  }
});