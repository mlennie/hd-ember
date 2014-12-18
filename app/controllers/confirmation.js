import Ember from 'ember';

export default Ember.Controller.extend({
  success: function() {
    return this.get('params.result') === 'success';
  }.property()
});
