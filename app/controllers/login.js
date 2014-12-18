import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(
  LoginControllerMixin, {
  authenticator: 'simple-auth-authenticator:devise',
  confirmation_success: function() {
    return this.get('params.confirmation') === 'confirmation_success';
  }.property(),
  confirmation_fail: function() {
    return this.get('params.confirmation') === 'confirmation_fail';
  }.property()
});
