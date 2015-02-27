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
		var url = "https%3A%2F%2Fwww.happydining.fr%2Fregister%3FreferralCode%3D"
		//must add referral to querry string. If not facebook does not work sometimes
		return url + 'referral' + this.get('currentUser.referralCode');
	}.property('referralCodeUrl'),

	//get info for referall email link
	emailReferralMessage: function() {
		var mail = "mailto:?";
		var subject = "subject=Une nouvelle appli à essayer absolument&";
		var body = "body=Lorsque tu reserves un restaurant avec Happy Dining tu reçois personnellement de 10 à 30 pourcent du montant de l'addition. Si tu t'inscris avec ce lien tu recevras instantanément 5 euros sur ton compte : ";
		var link = this.get('referralCodeUrl'); 
		return mail + subject + body + link;
	}.property('referralCodeUrl'),

	//get facebook share url
	facebookShareUrl: function() {
		var facebookUrl = 'https://www.facebook.com/sharer/sharer.php?';
		var url = 'u=' + this.get('queryReferralUrl');
		var title = "&t=Si%20tu%20reserves%20un%20restaurant%20tu%20re%C3%A7ois%2010%25%20%C3%A0%2030%25%20du%20montant%20de%20l'addition.%20D'%C3%A9j%C3%A0%205%20euros%20cr%C3%A9dit%C3%A9%20grace%20%C3%A0%20ce%20lien"
		return facebookUrl + url + title;
	}.property('referralCodeUrl'),

	//get twitter share url
	twitterShareUrl: function() {
		var twitterUrl = "https://twitter.com/intent/tweet?";
		var source = "source=https%3A%2F%2Fwww.happydining.fr%2F&";
		var body = "Si%20tu%20reserves%20un%20restaurant%20tu%20re%C3%A7ois%2010%25%20%C3%A0%2030%25%20du%20montant%20de%20l'addition.%20D'%C3%A9j%C3%A0%205%20euros%20cr%C3%A9dit%C3%A9%20grace%20%C3%A0%20ce%20lien";
		var text = "text=" + body + ":%20" + this.get('queryReferralUrl');
		return twitterUrl + source + text;
	}.property('referralCodeUrl')
});