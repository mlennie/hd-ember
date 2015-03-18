import DS from 'ember-data';

export default DS.Model.extend({
  time: DS.attr('date'),
  restaurant_name: DS.attr('string'),
  status: DS.attr('string'),
  user: DS.belongsTo('user', {async: true}),
  restaurant: DS.belongsTo('restaurant', {async: true}),
});
