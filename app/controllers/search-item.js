import Ember from 'ember';

export default Ember.ObjectController.extend({
	backgroundUrl: function() {
    return 'background-image: url(' + this.get('imgUrl')+');';
  }.property()
});
