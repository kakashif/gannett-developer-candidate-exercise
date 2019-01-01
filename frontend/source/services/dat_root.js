angular
  .module('application.services.data.root', [])
  .factory('RootSrv', RootSrv);

function RootSrv($config, $http, $sce) {
  return {
    get: getProfile,
    getContents: getProfileContents,
  };

  function getProfile() {
    return $http.get(`${$config.url}/profile`)
    .then(success => success.data);
  }

  function getProfileContents(profileId) {
    return $http.get(`${$config.url}/content/` + profileId)
    .then(success => success.data);
  }
}
