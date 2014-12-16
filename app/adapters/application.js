import DS from 'ember-data';
import ENV from "hd-ember/config/environment";

export default DS.ActiveModelAdapter.extend({
  host: 'http://hd-rails.herokuapp.com'
});
