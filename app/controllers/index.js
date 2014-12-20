import Ember from 'ember';

export default Ember.Controller.extend({
  //properties
  mailFailed: false,
  mailSuccessful: false,
  subscribeFailed: false,
  subscribeSuccessful: false,
  subscribeFirstName: '',
  subscribeLastName: '',
  subscribeEmail: '',
  contactEmailEmail: '',
  contactEmailName: '',
  contactEmailContent:'',

  //computed
  contactEmail: function() {
    return this.store.createRecord('contact-email', {});
  }.property(),
  preSubscription: function() {
    return this.store.createRecord('pre-subscriber', {});
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
    preSubscribe: function() {
      //set pre subscription
      var ps = this.get('preSubscription');
      ps.set('firstName', this.get('subscribeFirstName'));
      ps.set('lastName', this.get('subscribeLastName'));
      ps.set('email', this.get('subscribeEmail'));

      //save presubscription 
      var _this = this;
      var onSubscribeSuccess = function(){
        _this.set('subscribeFailed', false);
        _this.set('subscribeSuccessful', true);
      };

      var onSubscribeFail = function() {
        _this.set('subscribeFailed', true);
      };

      ps.save().then(onSubscribeSuccess,onSubscribeFail);
    }
  }
});
