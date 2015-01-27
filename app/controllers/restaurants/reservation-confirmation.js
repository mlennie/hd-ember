import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['date', 'time', 'number', 'name', 'discount'],
  
  //properties
  date: null,
  time: null,
  number: null,
  name: null,
  isLoading: false,
  reservationSuccess: false,
  reservationFail: false,
  discount: null,

  //actions
  actions: {
  	confirmReservation: function() {
      var time = new Date(moment(this.get('date') + ',' + this.get('time')));
      //show loading spinner
      this.set('isLoading', true);

      //build reservation
  		var reservation = this.store.createRecord('reservation', {
  			nbPeople: this.get('number'),
  			time: time,
  			status: "not_viewed",
  			restaurant: this.get('model'),
  			user: this.get('session.currentUser'),
  			service: null,
  			discount: this.get('discount') / 100,
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