import Ember from 'ember';

export default Ember.View.extend({

	setTwitterButton: function() {
    !function(d,s,id){
    	var js, fjs = d.getElementsByTagName(s)[0]
    	if (!d.getElementById(id)){
    		js = d.createElement(s);
    		js.id = id;
    		js.src = 'https://platform.twitter.com/widgets.js';
    		fjs.parentNode.insertBefore(js,fjs);
    	}
    }(document, 'script', 'twitter-wjs');
  }.on('didInsertElement'),
  setFacebookButton: function() {
  	(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); 
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }.on('didInsertElement')
});