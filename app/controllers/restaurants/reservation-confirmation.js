import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['date', 'time', 'number', 'name', 'discount'],
  
  //properties
  date: null,
  time: null,
  number: null,
  name: null,
  phone: null,
  isLoading: false,
  reservationSuccess: false,
  reservationFail: false,
  discount: null,
  showDiscountError: false,
  showNoAvailibilitiesError: false,

  //computed properties
  dontShowReserveButton: function() {
    if (this.get('reservationSuccess') === true ||
        this.get('showNoAvailibilitiesError') === true) {
      return true;
    } else {
      return false;
    }
  }.property('showNoAvailibilitiesError', 'reservationSuccess'),

  //actions
  actions: {
  	confirmReservation: function(phone) {
      debugger;
      if (!phone) {
        alert('Veuillez indiquer un numéro');
      } else {

        //parse date and time
        var dateArray = this.get('date').split('-');
        var timeArray = this.get('time').split(':');
        
        var year = dateArray[0];
        var month = dateArray[1] - 1;
        var day = dateArray[2];
        var hour = timeArray[0];
        var minutes = timeArray[1];

        var time = new Date(year,month,day,hour,minutes);

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
    			bookingName: this.get('name'),
          phone: this.get('phone')
    		});

        var controller = this;

        //save reservation
    		reservation.save().then(function(){
          //hide loading spinner
          controller.setProperties({
            isLoading: false,
            reservationSuccess: true,
            reservationFail: false,
            showDiscountError: false,
            showNoAvailibilitiesError: false
          });
        }, function(response) {
          //reset all properties
          controller.setProperties({
            isLoading: false,
            reservationSuccess: false,
            reservationFail: false,
            showDiscountError: false,
            showNoAvailibilitiesError: false
          });

          if (response.errors.discount !== null) {
            //show error message if no availabilites left
            if (response.errors.discount === 0) {
              controller.setProperties({
                discount: response.errors.discount * 100,
                showNoAvailibilitiesError: true
              });
            } else {
              //show error message if discount different
              controller.setProperties({
                discount: response.errors.discount * 100,
                showDiscountError: true
              });
            }
          } else {
            //hide loading spinner
            controller.setProperties({
              reservationFail: true
            });
          }
        });
      }
  	}
  }
});