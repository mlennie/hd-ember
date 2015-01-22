import DS from 'ember-data';

export default DS.Model.extend({
  availabilities: DS.attr('number'),
  startTime: DS.attr(),
  lastBookingTime: DS.attr(),
  nb10: DS.attr('number'),
  nb15: DS.attr('number'),
  nb20: DS.attr('number'),
  nb25: DS.attr('number'),
  restaurant: DS.belongsTo('restaurant')
});
