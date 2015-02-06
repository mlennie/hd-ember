import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  imgUrl: DS.attr('string'),
  description: DS.attr('string'),
  zipcode: DS.attr('string'),
  street: DS.attr('string'),
  city: DS.attr('string'),
  user: DS.belongsTo('user', {async: true}),
  fullAddress: function() {
    var street = this.get('street');
    var city = this.get('city');
    var zipcode = this.get('zipcode');
    return street + ', ' + city + ', ' + zipcode;
  }.property('zipcode','street','city'),
  shortDescription: function() {
    var description = this.get('description');
    return description.split(' ').slice(0,25).join(' ');
  }.property('description'),
  shortMobileDescription: function() {
    var description = this.get('description');
    return description.split(' ').slice(0,15).join(' ');
  }.property('description')
});
