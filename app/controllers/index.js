import Ember from 'ember';
import SearchMixin from '../mixins/search';

export default Ember.Controller.extend(SearchMixin,{
  //properties
  mailFailed: false,
  mailSuccessful: false,
  contactEmailEmail: '',
  contactEmailName: '',
  contactEmailContent:'',
  registrationSuccessful: false,
  registrationFailed: false,
  email: '',
  password: '',
  passwordConfirmation: '',

  //computed
  contactEmail: function() {
    return this.store.createRecord('contact-email', {});
  }.property(),
  user: function(){
    return this.store.createRecord('user', {});
  }.property(),

  //actions
  actions: {
    sendContactEmail: function() {
      //set contact email
      var ce = this.get('contactEmail');
      ce.set('email', this.get('contactEmailEmail'));
      ce.set('name', this.get('contactEmailName'));
      ce.set('content', this.get('contactEmailContent'));

      //save contact email
      var _this = this;
      var onMailSuccess = function(){
        _this.set('mailFailed', false);
        _this.set('mailSuccessful', true);
      };

      var onMailFail = function() {
        _this.set('mailFailed', true);
      };

      ce.save().then(onMailSuccess,onMailFail);
    },
     registerUser: function() {
      //set user
      var user = this.get('user');
      user.set('email', this.get('email'));
      user.set('password', this.get('password'));
      user.set('passwordConfirmation', this.get('passwordConfirmation'));

      //save user
      var _this = this;
      var onSuccess = function(){
        _this.set('registrationFailed', false);
        _this.set('registrationSuccessful', true);
      };

      var onFail = function() {
        _this.set('registrationFailed', true);
      };

      user.save().then(onSuccess,onFail);
    }
  }
});
