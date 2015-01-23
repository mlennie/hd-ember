import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['date', 'time', 'number', 'name'],
  
  //properties
  date: null,
  time: null,
  number: null,
  name: null
});