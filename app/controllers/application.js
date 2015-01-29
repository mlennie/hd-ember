import Ember from 'ember';
import SearchMixin from '../mixins/search';

export default Ember.Controller.extend(SearchMixin,{
	
	//computed properties
	showCookieMessage: function() {
		//get cookieAccepted cookie and if not there (cookies not accepted)
		//then show cookie message
    var cookie = this.get('cookie');
    var cookiesAccepted = cookie.getCookie('cookiesAccepted');
    return (cookiesAccepted === undefined) ? true : false ;
	}.property('currentPath'),

	//scroll to top of page on page change
	currentPathChanged: function () {
    window.scrollTo(0, 0);
  }.observes('currentPath'),

  //actions
  actions: {

  	//close cookies message and add cookies accepted cookie to browser
  	//when user closes cookie message
  	closeAndAcceptCookies: function() {
  		var cookie = this.get('cookie');
	    cookie.setCookie('cookiesAccepted', true);
	    this.set('showCookieMessage', false);
  	}
  }
});
