/* jshint expr:true */
import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

describe('Acceptance: HomePage', function() {
  beforeEach(function() {
    App = startApp();
  });

  afterEach(function() {
    Ember.run(App, 'destroy');
  });

  it('can visit home page and see proper content', function() {
    visit('/');

    andThen(function() {
      expect(currentPath()).to.equal('index');
      expect(find('#title').text()).to.equal('Welcome to Happy Dining!');
    });
  });
});
