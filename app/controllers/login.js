import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(

	//authentication mixin
  LoginControllerMixin, {

  //properties
  authenticator: 'simple-auth-authenticator:devise',
  identification: null,
  password: null,
  loginError: false,

  //computed
  confirmation_success: function() {
    return this.get('params.confirmation') === 'confirmation_success';
  }.property(),
  confirmation_fail: function() {
    return this.get('params.confirmation') === 'confirmation_fail';
  }.property(),

  //actions
  actions: {
    authenticate: function() {
      var controller = this;
      //set authentication data to send to rails
      var data = this.getProperties('identification', 'password');
      this.get('session').authenticate(this.get('authenticator'), data).then(function() {
        //do nothing special if authenticated
      }, function(error) {
        //show authenticate error if authentication not good
        controller.set('loginError', true);
        controller.set('password', null);
      });
    }
  }
});
