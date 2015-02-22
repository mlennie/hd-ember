import DS from 'ember-data';

export default DS.Model.extend({
  course: DS.attr('string'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  price: DS.attr('number'),
  street: DS.attr('string'),
  city: DS.attr('string'),
  menu: DS.belongsTo('menu', {async: true})
});
