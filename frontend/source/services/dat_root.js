angular
  .module('application.services.data.root', [])
  .factory('RootSrv', RootSrv);

function RootSrv($config, $http, $sce) {
  return {
    get: getProfile,
    getContents: getProfileContents,
  };

  function getProfile() {
    return $http.get(`https://peaceful-springs-7920.herokuapp.com/profile/`)
    .then(success => success.data);
  }

  function getProfileContents(profileId) {
    return $http.get(`${$config.url}profile/${profileId}`)
    .then(success => success.data);
  }
}
