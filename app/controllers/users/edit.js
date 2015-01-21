import Ember from 'ember';
import CurrentUserMixin from '../../mixins/current-user';

export default Ember.Controller.extend(CurrentUserMixin, {
	//properties
	success: false,
	fail: false,
  isLoading: false,

	//actions
	actions: {
    update: function() {
    	var controller = this;
      controller.set('isLoading', true);
      var user = this.get('currentUser');
      user.setProperties({
       	email: this.get('email'),
       	firstName: this.get('firstName'),
       	lastName: this.get('lastName')
      });
      user.save().then(function() {
        controller.set('isLoading', false);
        controller.set('success', true);
        controller.set('fail', false);
      }, function() {
        controller.set('isLoading', false);
        controller.set('success', false);
        controller.set('fail', true);
      });
    }
  }
});