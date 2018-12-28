

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
        ctrl.profile = data;
        console.log(ctrl.profile)
      })
      .catch(error => {
        $log.error('Error retrieving profile:', error);
        Alertify.error('Error getting profile & contents!');
      });
  }

  resolver();
}
