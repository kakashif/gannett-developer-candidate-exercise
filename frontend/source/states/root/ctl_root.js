

angular
  .module('application.states.root')
  .controller('RootController', RootController);


function RootController(
  RootSrv,
  $uibModal, $scope,
  $localStorage,
  $log,
  $http,
  jwtHelper,
  $window,
  $state,
  Alertify
) {
  'ngInject';

  const ctrl = this;

  function resolver() {
    return RootSrv.get()
      .then(data => {
        return RootSrv.getContents(data.profileId)
        .then(content => {
          ctrl.articles = content.articles;
          ctrl.theme = content.theme;
          console.log(ctrl.articles);
          console.log(ctrl.theme)
        })
      })
      .catch(error => {
        $log.error('Error retrieving profile:', error);
        Alertify.error('Error getting profile & contents!');
      });
  }

  resolver();
}
