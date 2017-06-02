app.controller('searchController', ['$scope','$http','localStorageService',
    function ($scope, $http,localStorageService) {

    var data = localStorageService.get('dataSearch');

    console.log(data);

    $http({
        method  : 'POST',
        url     : '/search/users',
        data:  data,
        headers : { 'Content-Type': 'application/json' }
    })
        .success(function(data, status) {
            console.log(data);
            $scope.users = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.serachCompetitor = function() {
        var data = {
            search: $scope.search
        };
        localStorageService.remove('dataSearch');
        localStorageService.set('dataSearch', data);
        window.location.reload();
    }
}]);
