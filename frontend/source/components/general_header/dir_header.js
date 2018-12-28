

angular
  .module('application.components.header')
  .directive('header', () => ({
    restrict: 'A',
    scope: true,
    bindToController: true,
    replace: true,
    controller: 'HeaderController',
    controllerAs: 'ctrl',
    templateUrl: 'tpl_header.html',
  }));
