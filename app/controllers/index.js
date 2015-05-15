import Ember from 'ember';
import SearchMixin from '../mixins/search';

export default Ember.Controller.extend({
  needs: "application",
  application: Ember.computed.alias("controllers.application"),

  queryParams: ['concept', 'confirmation_success', 'confirmation_fail', 'already_logged_in'],
  concept: null,
  confirmation_success: null,
  confirmation_fail: null,
  already_logged_in: null,
  //properties
  mailFailed: false,
  mailSuccessful: false,
  contactEmailEmail: '',
  contactEmailName: '',
  contactEmailContent:'',

  //computed
  contactEmail: function() {
    return this.store.createRecord('contact-email', {});
  }.property(),

  //actions
  actions: {
    sendContactEmail: function() {
      //set contact email
      var ce = this.get('contactEmail');
      ce.setProperties({
        email: this.get('contactEmailEmail'),
        name: this.get('contactEmailName'),
        content: this.get('contactEmailContent')
      });

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

    //scroll down to concept part of page when concept button clicked
    scrollToConcept: function() {
      Ember.$(document).ready(
        Ember.$('html, body').animate({
            scrollTop: 520
        }, 750)
      )
    },

    goToSearchResults: function() {
      //reset search mixin values
      this.get('application').setProperties({
        name: null,
        time: null,
        date: null,
        nbCouverts: null,
        discount: null,
        reserve: null,
        cuisine: undefined,
        number: null
      });

      //transition to search-results and reset query params
      this.transitionToRoute(
        'restaurants.search-results', 
        { queryParams: { 
          name: null, 
          cuisine: undefined,
          date: null,
          time: null,
          number: null
        }}
      );
    }
  }
});
