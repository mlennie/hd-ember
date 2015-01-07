import Ember from 'ember';
import ENV from "hd-ember/config/environment";
export default Ember.Controller.extend({
	//properties
  email: null,
  emailSuccess: false,
  emailFailed: false,

	//actions
	actions: {
    sendPasswordEmail: function() {
      var controller = this;
       // Custom ajax call for resending .                                                                             
      Ember.$.ajax({                                                                                                                                                                                       
        url: ENV.APP.HOST + '/password_update',                                                               
        type: 'PUT',                                                                                                 
        data: {
          email: this.get('email'),
          token: this.get('token') 
        }                                                                                   
      }).then(function(){                                                                                     
        controller.set('emailSuccess', true);                                                                                                                                               
        controller.set('emailFailed', false);                                                                                                                                               
      }, function(){                                                                                               
        controller.set('emailSuccess', false);                                                                                                                                               
        controller.set('emailFailed', true);                                                                                       
      });     
    }
  }
});