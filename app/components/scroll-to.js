import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'a',
  anchor: '',

  scrollTo: function () {
    var anchor = this.get('anchor'),
      $el = Ember.$(anchor);

    if ($el) {
      Ember.$('body').scrollTop($el.offset().top);
    }
  }.on('click')
});
