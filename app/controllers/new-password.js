import Ember from 'ember';
import ENV from "hd-ember/config/environment";
export default Ember.Controller.extend({
	//properties
  email: null,
  emailSuccess: false,
  emailFailed: false,
  isLoading: false,

	//actions
	actions: {
    sendPasswordEmail: function() {
      this.set('isLoading', true);
      var controller = this;
       // Custom ajax call for resending .                                                                             
      Ember.$.ajax({                                                                                                                                                                                       
        url: ENV.APP.HOST + '/password_email',                                                               
        type: 'GET',                                                                                                 
        data: {email: this.get('email') }                                                                                   
      }).then(function(){                                                                                     
        controller.set('emailSuccess', true);                                                                                                                                               
        controller.set('emailFailed', false); 
        controller.set('isLoading', false);                                                                                                                                              
      }, function(){                                                                                               
        controller.set('emailSuccess', false);                                                                                                                                               
        controller.set('emailFailed', true); 
        controller.set('isLoading', false);                                                                                      
      });     
    }
  }
});