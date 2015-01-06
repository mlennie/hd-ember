import Ember from 'ember';
export default Ember.Controller.extend({
	//properties
	success: false,
	fail: false,

	//computed properties
	email: function(){
		return this.get('model.email');
	}.property('model.email'),
	firstName: function(){
		return this.get('model.firstName');
	}.property('model.firstName'),
	lastName: function(){
		return this.get('model.lastName');
	}.property('model.lastName'),

	//actions
	actions: {
    update: function() {
    	var controller = this;
      var user = this.get('model');
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