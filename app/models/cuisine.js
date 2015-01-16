import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  restaurants: DS.hasMany('restaurant', {async: true})
});
