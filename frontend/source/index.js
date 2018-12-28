

angular.module('application', [
  // vendor dependency modules
  'ui.router',
  'ui.bootstrap',
  'Alertify',
  'ngAnimate',
  'ngStorage',
  'angular-jwt',
  'angular-jwt.interceptor',
  'angular.filter',
  'validation.match',

  // application services modules
  'application.services.data.root',


  // application state modules
  'application.states.root',

  // application templates module
  'application.templates',

  // application components modules
  'application.components.header',
  'application.components.footer',
])

.constant('$config', {
  url: '__API_ENDPOINT_URL__',  // Replaced by gulpfile dynamically
})

.config($locationProvider => ['$locationProvider', $locationProvider.html5Mode({
  enabled: true,
  requireBase: false,
})])

// $localStorage Prefix Configuration
.config($localStorageProvider => ['$localStorageProvider', $localStorageProvider.setKeyPrefix('GannetExercise.')])

// JWT Token Interceptor
.config(($logProvider, $httpProvider, jwtInterceptorProvider) => {
  'ngInject';

  // jwtInterceptorProvider.tokenGetter = ['DefaultSrv', DefaultSrv => DefaultSrv.token];
  // $httpProvider.interceptors.push('jwtInterceptor');
})

// Pre-assign Bindings for Angular 1.6
.config($compileProvider => {
  'ngInject';

  $compileProvider.preAssignBindingsEnabled(true);
})

// filter unsafe strings
.filter('unsafe', function($sce) {
  return function (val) {
    if( (typeof val === 'string' || val instanceof String)) {
      return $sce.trustAsHtml(val);
    }
  }
})
// Detect unauthorized publicAccess or directAccess
.run(($log, $config, $state, $rootScope, $http, $localStorage, Alertify, $uibModalStack) => {
  'ngInject';

  $log.info('Gannet Exercise Started. API Endpoint:', $config.url);

  // Alertify Configuration
  Alertify.defaults.transition = 'fade';
  Alertify.defaults.glossary.title = 'gannett-exercise';
  Alertify.defaults.closeableByDimmer = false;
  Alertify.set('notifier', 'position', 'bottom-right');


  $state.go('root');
  $rootScope.$on('$destroy', $rootScope.$on('$stateChangeStart', (event, toState) => {
    $rootScope.stateLoading = true;
    $uibModalStack.dismissAll('Changing states, closing all open modals!');
    if (toState.publicAccess) return;
    event.preventDefault();
    $state.go('root');
  }));

  $rootScope.$on('$destroy', $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState) => {
    $rootScope.stateLoading = false;
    if (!fromState.name && !toState.directAccess) {
      event.preventDefault();
      $state.go('root');
    }
  }));
});
