import DS from 'ember-data';

export default DS.Model.extend({
  kind: DS.attr('string'),
  itemable_type: DS.attr('string'),
  itemable_id: DS.attr('number'),
  concernable_type: DS.attr('string'),
  concernable_id: DS.attr('number'),
  concernable_id: DS.attr('number'),
  discount: DS.attr('number'),
  user_contribution: DS.attr('number'),
  amount: DS.attr('number')
});
