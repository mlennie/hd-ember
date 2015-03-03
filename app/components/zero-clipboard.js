// file: your-app/components/zero-clipboard.js

import ZeroClipboard from 'ember-cli-zero-clipboard/components/zero-clipboard';

export default ZeroClipboard.extend({
  actions: {
    afterCopy: function(){
      // this gets triggered after the copy event
      alert("Lien copié, partagez votre lien.");
    }
  }
});