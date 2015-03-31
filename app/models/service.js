import DS from 'ember-data';

export default DS.Model.extend({
  startTime: DS.attr('date'),
  lastBookingTime: DS.attr('date'),
  status: DS.attr('string'),
  currentDiscount: DS.attr(),
  restaurant: DS.belongsTo('restaurant', {async: true}),
  reservations: DS.hasMany('reservation')
});
