import Ember from 'ember';
import ENV from "hd-ember/config/environment";
import CurrentUserMixin from '../../mixins/current-user';

export default Ember.Controller.extend(CurrentUserMixin, {

	//get site url based on environment
	siteURL: function() {
		return ENV.APP.EMBER_URL;
	}.property(),

	//get referral code
	referralCodeUrl: function() {
		var url = this.get('siteURL');
		var registerUrl = url + '/register';
		var referral_code = this.get('currentUser.referralCode');
		return registerUrl + '?referralCode=' + referral_code;
	}.property('currentUser'),

	//get query string referral url
	queryReferralUrl: function() {
		var url = "https%3A%2F%2Fhd-ember.herokuapp.com%2Fregister%3FreferralCode%3D"
		return url + this.get('currentUser.referralCode');
	}.property('referralCodeUrl'),

	//get info for referall email link
	emailReferralMessage: function() {
		var mail = "mailto:?";
		var subject = "subject=Une nouvelle appli à essayer absolument&";
		var body = "body=Lorsque tu reserves un restaurant avec Happy Dining tu reçois personnellement de 10 à 30 pourcent du montant de l'addition. Si tu t'inscrit avec ce lien tu recevras instantanément 5 euros sur ton compte : ";
		var link = this.get('referralCodeUrl'); 
		return mail + subject + body + link;
	}.property('referralCodeUrl'),

	//get facebook share url
	facebookShareUrl: function() {
		var facebookUrl = 'https://www.facebook.com/sharer/sharer.php?';
		var url = 'u=' + this.get('queryReferralUrl');
		var title = '&t=Please%20sign%20up%20for%20happy%20dining.%20You%20get%20money%20for%20eating%20out%20and%20if%20you%20sign%20up%20I%20get%20money%20too!'
		return facebookUrl + url + title;
	}.property('referralCodeUrl'),

	//get twitter share url
	twitterShareUrl: function() {
		var twitterUrl = "https://twitter.com/intent/tweet?";
		var source = "source=https%3A%2F%2Fhd-ember.herokuapp.com%2F&";
		var body = "Please%20sign%20up%20for%20happy%20dining.%20You%20get%20money%20for%20eating%20out%20and%20if%20you%20sign%20up%20I%20get%20money%20too!";
		var text = "text=" + body + ":%20" + this.get('queryReferralUrl');
		return twitterUrl + source + text;
	}.property('referralCodeUrl')
});