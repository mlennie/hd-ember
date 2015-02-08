import Ember from 'ember';

export default Ember.Controller.extend({
  //properties
  showReserveButton: true,

	//computed properties
  //get first menu for restaurant
  firstMenu: function() {
    return this.get('model.menus').get('firstObject');
  }.property('model'),
  menuItems: function() {
    return this.get('firstMenu.menuItems');
  }.property('firstMenu'),

  //get orderve menu items
  orderveMenuItems: function() {
    return this.get('menuItems').filterBy('course', 'Hors_doeuvre');
  }.property('firstMenu'),

  //get entree menu items
  entreeMenuItems: function() {
    return this.get('menuItems').filterBy('course', 'entree');
  }.property('firstMenu'),

  //get principaux menu items
  principauxMenuItems: function() {
    return this.get('menuItems').filterBy('course', 'principaux');
  }.property('firstMenu'),

  //get boisson menu items
  dessertMenuItems: function() {
    return this.get('menuItems').filterBy('course', 'dessert');
  }.property('firstMenu'),

  //get boisson menu items
  boissonMenuItems: function() {
    return this.get('menuItems').filterBy('course', 'boisson');
  }.property('firstMenu'),

  backgroundUrl: function() {
    return 'background-image: url(' + this.get('model.imgUrl')+');';
  }.property('model'),

  //actions
  actions: {
    showPhoneNumber: function() {
      this.set('showReserveButton', false);
    }
  }
});
