import DS from 'ember-data';

export default DS.Model.extend({
  startTime: DS.attr(),
  lastBookingTime: DS.attr(),
  discount: DS.attr('discount'),
  restaurant: DS.belongsTo('restaurant', {async: true}),
  reservations: DS.hasMany('reservation')
});
