import DS from 'ember-data';

export default DS.Model.extend({
  startTime: DS.attr('date'),
  lastBookingTime: DS.attr('date'),
  currentDiscount: DS.attr(),
  restaurant: DS.belongsTo('restaurant', {async: true}),
  reservations: DS.hasMany('reservation')
});
