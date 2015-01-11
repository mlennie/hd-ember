import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  wallet: DS.belongsTo('wallet', {async: true}),
  restaurants: DS.hasMany('restaurant', {async: true}),
  roles: DS.hasMany('role', {async: true}),
  isOwner: function() {
  	var ownerRole = this.get('roles').findBy('name', 'owner');
  	return ownerRole !== null;
  }.property()
});
