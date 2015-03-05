import Ember from 'ember';

export default Ember.Controller.extend({
	backgroundUrl: function() {
    return 'background-image: url(' + this.get('imgUrl')+');';
  }.property('imgUrl')
});
