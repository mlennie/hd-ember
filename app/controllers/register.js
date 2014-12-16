import Ember from 'ember';

export default Ember.Controller.extend({
  registrationSuccessful: false,
  registrationFailed: false,
  response: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  user: function(){
    return this.store.createRecord('user', {});
  }.property(),
  actions: {
    registerUser: function() {
      //set user
      var user = this.get('user');
      user.set('email', this.get('email'));
      user.set('password', this.get('password'));
      user.set('passwordConfirmation', this.get('passwordConfirmation'));

      //save user
      var _this = this;
      var onSuccess = function(user){
        _this.set('registrationFailed', false);
        _this.set('registrationSuccessful', true);
      };

      var onFail = function(errors) {
        _this.set('registrationFailed', true);
      };

      user.save().then(onSuccess,onFail);
    }
  }
});
