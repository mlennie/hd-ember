import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(

	//authentication mixin
	LoginControllerMixin, {

	//queryParams
	queryParams: ['confirmation_success','confirmation_fail'],

	//properties
	authenticator: 'simple-auth-authenticator:devise',
	identification: null,
	password: null,
	loginError: false,
	confirmation_success: false,
	confirmation_fail: false,
	isLoading: false,

	//actions
	actions: {
		authenticate: function() {

			var controller = this;
			controller.setProperties({
				confirmation_success: false,
				confirmation_fail: false,
				loginError: false,
				isLoading: true
			});

			//set authentication data to send to rails
			var data = this.getProperties('identification', 'password');
			this.get('session').authenticate(this.get('authenticator'), data).then(function() {
				
				//Identify user for Mixpanel
				mixpanel.identify(controller.get('session.user_id'));

				//MIXPANEL: Make a login event
				mixpanel.track('Login');

				controller.setProperties({
					isLoading: false
				});
			}, function() {
				//show authenticate error if authentication not good
				controller.setProperties({
					loginError: true, 
					password: null,
					isLoading: false
				});
			});
		}
	}
});
