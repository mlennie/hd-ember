import DS from 'ember-data';

export default DS.Model.extend({
  nbPeople: DS.attr('number'),
  amount: DS.attr('number'),
  time: DS.attr('date'),
  status: DS.attr('string'),
  service: DS.belongsTo('service', {async: true}),
  discount: DS.attr('number'),
  userContribution: DS.attr('number'),
  bookingName: DS.attr('string'),
  restaurant_name: DS.attr('string'),
  date: DS.attr('string'),
  earnings: DS.attr('string'),
  user: DS.belongsTo('user', {async: true}),
  restaurant: DS.belongsTo('restaurant', {async: true})
});
