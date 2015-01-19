import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
	setupController: function(controller, model) {
    controller.set('registrationSuccessful', false);
    controller.set('registrationFailed', false);
    controller.set('genderBlank', false);
    controller.set('passwordMismatch', false);
    controller.set('passwordTooShort', false);
    this._super(controller, model);
  }
});