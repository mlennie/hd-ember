/* jshint expr:true */
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'view:application',
  'ApplicationView',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      var view = this.subject();
      expect(view).to.be.ok;
    });
  }
);
