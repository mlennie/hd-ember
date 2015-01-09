import Ember from 'ember';

export default Ember.Controller.extend({
	//computed properties
  backgroundUrl: function() {
    return 'background-image: url(' + this.get('model.imgUrl')+');';
  }.property('model')
});
