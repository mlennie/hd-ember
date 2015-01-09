import Ember from 'ember';
import ENV from "hd-ember/config/environment";
export default Ember.Controller.extend({
	//properties
  queryParams: ['token'],
  token: null,
  newPassword: null,
  newPasswordConfirmation: null,
  editSuccess: false,
  editFailed: false,

	//actions
	actions: {
    resetPassword: function() {
      var controller = this;
       // Custom ajax call for resending .                                                                             
      Ember.$.ajax({                                                                                                                                                                                       
        url: ENV.APP.HOST + '/update_password',                                                               
        type: 'PUT',                                                                                                 
        data: {
          password_reset_token: this.get('token'),
          password: this.get('newPassword'), 
          password_confirmation: this.get('newPasswordConfirmation'), 
        }                                                                                   
      }).then(function(){                                                                                     
        controller.set('editSuccess', true);                                                                                                                                               
        controller.set('editFailed', false);                                                                                                                                               
      }, function(){                                                                                               
        controller.set('editSuccess', false);                                                                                                                                               
        controller.set('editFailed', true);                                                                                       
      });     
    }
  }
});