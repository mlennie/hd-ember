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
      //set authentication data to send to rails
      var data = this.getProperties('identification', 'password');

      //call original function
      this._super(data)

      //erase password and show login error
      this.setProperties({
        loginError: true,
        password: null
      });
    }
  }
});
