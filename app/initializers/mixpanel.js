export function initialize(container) {
  var router = container.lookup('router:main');
  router.on('didTransition', function() {
    var page = this.get('url');
    if (!page) {
        var loc = window.location;
        page = loc.hash ? loc.hash.substring(1) : loc.pathname + loc.search;
    }

    mixpanel.track("visit", {pageName: page});
  });
}

export default {
  name: 'mixpanel',
  initialize: initialize
};
