import DS from 'ember-data';

export default DS.Model.extend({
  balance: DS.attr('number'),
  user: DS.belongsTo('user'),
  concernable: DS.belongsTo('concernable', { polymorphic: true, async: true })
});
