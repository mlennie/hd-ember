import Ember from 'ember';

export default Ember.Controller.extend({
  //queryParams
  queryParams: ['referral_code'],

  //properties
  referral_code: null,
  registrationSuccessful: false,
  registrationFailed: false,
  genderBlank: false,
  codeBad: false,
  passwordTooShort: false,
  passwordMismatch: false,
  lastName: '',
  firstName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  gender: '',
  promotionCode: '',
  isLoading: false,

  //computed properties
  user: function(){
    return this.store.createRecord('user', {});
  }.property(),

  //actions
  actions: {
  
    registerUser: function() {
      //check client side validations
      if (this.get('gender') === '') {
        //add gender warning
        this.set('genderBlank', true);
      } else if (this.get('password').length < 4) {
        //remove gender warning
        this.set('genderBlank', false);
        //set new warning
        this.set('passwordTooShort', true);
      } else if (this.get('password') !== this.get('passwordConfirmation')) {
        //remove old warnings
        this.set('genderBlank', false);
        this.set('passwordTooShort', false);
        //add new warning
        this.set('passwordMismatch', true);
      } else { //send create request

        //add loading spinner
        this.set('isLoading', true);
        
        //remove error warnings
        this.setProperties({
          genderBlank: false,
          passwordMismatch: false,
          passwordTooShort: false
        });

        //set user
        var user = this.get('user');

        //get cookies
        var cookie = this.get('cookie');
        var referred_user_code = cookie.getCookie('referralCode');

        //set new attributes
        user.setProperties({
          lastName: this.get('lastName'),
          firstName: this.get('firstName'),
          email: this.get('email'),
          password: this.get('password'),
          passwordConfirmation: this.get('passwordConfirmation'),
          gender: this.get('gender'),
          promotionCode: this.get('promotionCode'),
          referredUserCode: referred_user_code
        });

        //setup callbacks for after user request is sent
        var _this = this;
        var onSuccess = function(user){

          //MIXPANEL: create a mixpanel alias (assign user id to given profile id)
          mixpanel.alias(user.id.toString());
          //MIXPANEL: Add registered event
          mixpanel.track('Registered', { 'Made By': 'User' });
          //MIXPANEL: Add user profile
          mixpanel.people.set({
            'Id': user.id,
            '$first_name': _this.get('firstName'),
            '$last_name': _this.get('lastName'),
            '$email': _this.get('email'),
            'Gender': _this.get('gender')
          });

          //reset properties
          _this.set('isLoading', false);
          _this.set('registrationFailed', false);
          _this.set('registrationSuccessful', true);
        };

        var onFail = function(response) {
          if (response["errors"]["code"] === 'bad') {
            _this.set('codeBad', true);
            _this.set('isLoading', false);
            _this.set('registrationFailed', false);
            _this.set('registrationSuccessful', false);
          } else {
            _this.set('isLoading', false);
            _this.set('registrationFailed', true);
            _this.set('registrationSuccessful', false);
          }
        };

        //send user update request
        user.save().then(onSuccess,onFail);
      }
    }
  }
});
