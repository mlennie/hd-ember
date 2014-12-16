import Ember from 'ember';

export default Ember.Controller.extend({
  email: '',
  password: '',
  passwordConfirmation: '',
  user: function(){
    return this.store.createRecord('user', {});
  }.property(),
  actions: {
    registerUser: function() {
      var user = this.get('user');
      user.set('email', this.get('email'));
      user.set('password', this.get('password'));
      user.set('passwordConfirmation', this.get('passwordConfirmation'));
      user.save().then(function() {
        console.log(user);
      });
    }
  }
});
