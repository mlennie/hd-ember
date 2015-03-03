import Ember from 'ember';

export default Ember.Controller.extend({
	backgroundUrl: function() {
		alert(this.get('imgUrl'));
    return 'background-image: url(' + this.get('imgUrl')+');';
  }.property('imgUrl')
});
