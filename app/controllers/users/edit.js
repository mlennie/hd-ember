import Ember from 'ember';
export default Ember.Controller.extend({
	//properties
	success: false,
	fail: false,

	//computed properties
  currentUser: function() {
    return this.get('session.currentUser');
  }.property('session.currentUser'),
	email: function(){
		return this.get('currentUser.email');
	}.property('currentUser.email'),
	firstName: function(){
		return this.get('currentUser.firstName');
	}.property('currentUser.email'),
	lastName: function(){
		return this.get('currentUser.lastName');
	}.property('currentUser.lastName'),

	//actions
	actions: {
    update: function() {
    	var controller = this;
      var user = this.get('currentUser');
      user.setProperties({
       	email: this.get('email'),
       	firstName: this.get('firstName'),
       	lastName: this.get('lastName')
      });
      user.save().then(function() {
        controller.set('success', true);
        controller.set('fail', false);
      }, function() {
        controller.set('success', false);
        controller.set('fail', true);
      });
    }
  }
});