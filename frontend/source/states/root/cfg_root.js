

angular
  .module('application.states.root', [])
  .config($stateProvider => {
    'ngInject';

    $stateProvider
      .state('root', {
        url: '/',
        views: {
          header: {
            templateUrl: 'tpl_header.html',
            controller: 'HeaderController as ctrl',
          },
          content: {
            templateUrl: 'tpl_root.html',
            controller: 'RootController as ctrl',
          },
          footer: {
            templateUrl: 'tpl_footer.html',
          },
        },
        directAccess: true,
        publicAccess: false,
      });
  });
