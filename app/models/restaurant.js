import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  imgUrl: DS.attr('string'),
  description: DS.attr('string'),
  zipcode: DS.attr('string'),
  street: DS.attr('string'),
  city: DS.attr('string'),
  user: DS.belongsTo('user', {async: true}),
  cuisines: DS.hasMany('cuisine', {async: true}),
  services: DS.hasMany('service', {async: true}),
  fullAddress: function() {
    var street = this.get('street');
    var city = this.get('city');
    var zipcode = this.get('zipcode');
    return street + ', ' + city + ', ' + zipcode;
  }.property('zipcode','street','city')
});
