import DS from 'ember-data';

export default DS.Model.extend({
  time: DS.attr('date'),
  restaurant_name: DS.attr('string'),
  status: DS.attr('string'),
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
  }.property('earnings')
});
