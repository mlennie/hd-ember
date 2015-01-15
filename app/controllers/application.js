import Ember from 'ember';
import SearchMixin from '../mixins/search';

export default Ember.Controller.extend(SearchMixin,{
	currentPathChanged: function () {
    window.scrollTo(0, 0);
  }.observes('currentPath')
});
