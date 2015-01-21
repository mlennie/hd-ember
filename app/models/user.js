import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  gender: DS.attr('string'),
  wallet: DS.belongsTo('wallet', {async: true}),
  referralCode: DS.attr('string'),
  restaurants: DS.hasMany('restaurant', {async: true}),
  roles: DS.hasMany('role', {async: true}),
  promotionCode: DS.attr('string'),
  isOwner: function() {
  	var ownerRole = this.get('roles').findBy('name', 'owner');
  	if (ownerRole !== undefined) {
      return ownerRole.get('name') === 'owner';
    } else {
      return false;
    }

  }.property('roles'),
  fullName: function() {
    if (this.get('firstName') !== null && this.get('lastName') !== null) {
      return this.get('firstName') + ' ' + this.get('lastName');
    }
  }.property('firstName', 'lastName')
});
