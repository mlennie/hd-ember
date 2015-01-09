import Ember from 'ember';
import ENV from "hd-ember/config/environment";
export default Ember.Controller.extend({
	//properties
  email: null,
  emailSuccess: false,
  emailFailed: false,

	//actions
	actions: {
    resendConfirmationEmail: function() {
      var controller = this;
       // Custom ajax call for resending .                                                                             
      Ember.$.ajax({                                                                                                                                                                                       
        url: ENV.APP.HOST + '/resend_confirmation',                                                               
        type: 'GET',                                                                                                 
        data: {email: this.get('email') }                                                                                   
      }).then(function(){                                                                                     
        controller.set('emailSuccess', true);                                                                                                                                               
        controller.set('emailFailed', false);  
        controller.set('email', null);                                                                                                                                             
      }, function(){                                                                                               
        controller.set('emailSuccess', false);                                                                                                                                               
        controller.set('emailFailed', true);                                                                                       
      });     
    }
  }
});