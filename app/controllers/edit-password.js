import Ember from 'ember';
import ENV from "hd-ember/config/environment";
export default Ember.Controller.extend({
	//properties
  queryParams: ['token'],
  token: null,
  newPassword: null,
  newPasswordConfirmation: null,
  editFailed: false,
  isLoading: false,

	//actions
	actions: {
    resetPassword: function() {
      var controller = this;
      controller.set('isLoading', true);                                                                                                                                               
      controller.set('editFailed', false); 
       // Custom ajax call for resending .                                                                             
      Ember.$.ajax({                                                                                                                                                                                       
        url: ENV.APP.HOST + '/update_password',                                                               
        type: 'POST',                                                                                                 
        data: {
          password_reset_token: this.get('token'),
          password: this.get('newPassword'), 
          password_confirmation: this.get('newPasswordConfirmation'), 
        }                                                                                   
      }).then(function(){                                                                                     
        controller.set('editFailed', false);  
        controller.set('isLoading', false);
        controller.transitionToRoute('login', { queryParams: {editSuccess: true}});                                                                                                                                           
      }, function(){                                                                                                                                                                     
        controller.set('editFailed', true);     
        controller.set('isLoading', false);                                                                                    
      });     
    }
  }
});