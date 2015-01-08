import DS from 'ember-data';

export default DS.Model.extend({
  balance: DS.attr('number')
  //concernable: DS.belongsTo('concernable', { polymorphic: true, async: true })
});
