

angular
  .module('application.components.footer')
  .directive('footer', () => ({
    restrict: 'A',
    scope: true,
    bindToController: true,
    replace: true,
    templateUrl: 'tpl_footer.html',
  }));
