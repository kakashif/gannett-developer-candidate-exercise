

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
        // Build the expiration date string:
        const expiration_date = new Date();
        let profile_cookie = '';
        expiration_date.setFullYear(expiration_date.getFullYear() + 1);
        profile_cookie = `profileId=${data.profileId}; path=/; expires=` + expiration_date.toUTCString();
        document.cookie = profile_cookie;
        return RootSrv.getContents(data.profileId)
        .then(content => {
          ctrl.articles = content.articles;
          ctrl.theme = content.theme;
        })
      })
      .catch(error => {
        $log.error('Error retrieving profile:', error);
        Alertify.error('Error getting profile & contents!');
      });
  }

  resolver();
}
