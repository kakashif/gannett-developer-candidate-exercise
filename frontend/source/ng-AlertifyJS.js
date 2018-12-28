angular
  .module('Alertify', [])
  .factory('Alertify', $window => {
    'ngInject';

    return $window.alertify;
  }
);
