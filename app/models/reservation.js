import DS from 'ember-data';

export default DS.Model.extend({
  nbPeople: DS.attr('number'),
  time: DS.attr('date'),
  status: DS.attr('string'),
  restaurant: DS.belongsTo('restaurant'),
  user: DS.belongsTo('user'),
  service: DS.belongsTo('service'),
  discount: DS.attr('number'),
  userContribution: DS.attr('number'),
  bookingName: DS.attr('string')
});
