import Ember from 'ember';

export function fullDate(date) {
  return moment(date).stripTime();
}

export default Ember.Handlebars.makeBoundHelper(fullDate);
