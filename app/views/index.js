import Ember from 'ember';

export default Ember.View.extend({
	classNames: ['special-height'],
	
	formatSearchFields: function(){
   	Ember.$("#date").mask("99/99/99",{placeholder:"mm/dd/yy"});
	}.on('didInsertElement'),
});