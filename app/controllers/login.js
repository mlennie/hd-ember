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
  isSubmitting: false,

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
      var data = this.getProperties('identification', 'password');

      this._super(data);

      this.set('password', null);

      this.setProperties({
        loginError: true,
        loginResponse: 'login error'
      });
    }
  }
});
