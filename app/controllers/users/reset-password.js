import Ember from 'ember';
import ENV from "hd-ember/config/environment";
export default Ember.Controller.extend({
	//properties
  email: null,

	//actions
	actions: {
    sendPasswordEmail: function() {
       // Custom ajax call for resending .                                                                             
      Ember.$.ajax({                                                                                                                                                                                       
        url: ENV.APP.HOST + '/password_email',                                                               
        type: 'GET',                                                                                                 
        data: {email: this.get('email') }                                                                                   
      }).then(function(){                                                                                     
        alert('email sent!');                                                                                                                                                  
      }, function(){                                                                                               
        alert('error');                                                                                         
      });     
    }
  }
});