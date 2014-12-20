import Ember from 'ember';

export default Ember.Controller.extend({
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
  contactEmail: function() {
    return this.store.createRecord('contact-email', {});
  }.property(),
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

      ce.save().then(onSuccess,onFail);
    },
    preSubscribe: function() {
      //set contact email
      var ps = this.get('preSubscriber');
      ps.set('first_name', this.get('subscribeFirstName'));
      ps.set('last_name', this.get('subscribeLastName'));
      ps.set('email', this.get('subscribeEmail'));

      //save contact email
      var _this = this;
      var onSubscribeSuccess = function(){
        _this.set('subscribeFailed', false);
        _this.set('SubscribeSuccessful', true);
      };

      var onSubscribeFail = function() {
        _this.set('subscribeFailed', true);
      };

      ce.save().then(onSuccess,onFail);
    }
  }
});
