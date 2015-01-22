import DS from 'ember-data';

export default DS.Model.extend({
  availabilities: DS.attr('number'),
  startTime: DS.attr(),
  lastBookingTime: DS.attr(),
  nb_10: DS.attr('number'),
  nb_15: DS.attr('number'),
  nb_20: DS.attr('number'),
  nb_25: DS.attr('number'),
  restaurant: DS.belongsTo('restaurant')
});
