import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  kind: DS.attr('string'),
  price: DS.attr('number'),
  city: DS.attr('string'),
  restaurant: DS.belongsTo('restaurant', {async: true}),
  menuItems: DS.hasMany('menuItem', {async: true})
});
