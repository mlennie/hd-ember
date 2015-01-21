import Ember from 'ember';
import Session from "simple-auth/session";
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
	setupController: function(controller, model, queryParams) {
    controller.setProperties({
    	registrationSuccessful: false,
    	registrationFailed: false,
    	genderBlank: false,
    	passwordMismatch: false,
    	passwordTooShort: false,
      isLoading: false
    });
    this._super(controller, model);

    //set referral code in session
    if (queryParams.referralCode !== undefined) {
      var referralCode = queryParams.referralCode;
      Session.reopen({
        setReferralCode: function() {
          this.set("referralCode", user);
        }
      });
    }
  }
});