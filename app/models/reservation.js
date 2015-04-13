import DS from 'ember-data';

export default DS.Model.extend({
  nbPeople: DS.attr('number'),
  amount: DS.attr('number'),
  time: DS.attr('date'),
  status: DS.attr('string'),
  service: DS.belongsTo('service', {async: true}),
  discount: DS.attr('number'),
  userContribution: DS.attr('number'),
  bookingName: DS.attr('string'),
  restaurant_name: DS.attr('string'),
  date: DS.attr('string'),
  earnings: DS.attr('string'),
  user: DS.belongsTo('user', {async: true}),
  restaurant: DS.belongsTo('restaurant', {async: true}),

  earningsWithPlusSign: function() {

  	//alter earnings to be number we can use to compare 
  	//(to see if it's positive or not)
  	var earningsArray = this.get('earnings').split(',');
  	var earningsString = earningsArray[0] + '.' + earningsArray[1];
  	var earningsNumber = Number(earningsString);

  	if (earningsNumber > 0) {
  		return '+' + this.get('earnings');
  	} else {
  		return this.get('earnings');
  	}
  }.property('earnings'),

  earningsWithPlusSignForRestaurants: function() {
    //alter earnings to be number we can use to compare 
    //(to see if it's positive or not)
    var earningsArray = this.get('earnings').split(',');
    var earningsString = earningsArray[0] + '.' + earningsArray[1];
    var earningsNumber = Number(earningsString);

    if (earningsNumber > 0) {
      return '-' + this.get('earnings');
    } else {
      var absEarnings = Math.abs(earningsNumber);
      var absEarningsArray = absEarnings.toString().split('.');
      var absEarningsString = '+' + absEarningsArray[0] + ',' + earningsArray[1];
      return absEarningsString;
    }
  }.property('earnings')
});
