/* jshint expr:true */
import {
  describeModel,
  it
} from 'ember-mocha';

describeModel(
  'restaurant',
  'Restaurant',
  {
    // Specify the other units that are required for this test.
      needs: []
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      var model = this.subject();
      // var store = this.store();
      expect(model).to.be.ok;
    });
  }
);
