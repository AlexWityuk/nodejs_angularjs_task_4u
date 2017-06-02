app.controller('MainController', ['$scope','$http','$routeParams','$uibModal', 'localStorageService',
    function ($scope, $http, $routeParams, $uibModal, localStorageService) {
        var page = $routeParams.page;
        if(typeof page == "undefined") page = 1;
        $scope.pages = [];
        $http.get('/users/' + page)
            .success(function(data) {
                $scope.users = data.allUsers;
                $scope.count = parseInt(data.count.count);
                console.log($scope.count);
                for (var i=0; i<Math.ceil($scope.count/5); i++){
                    $scope.pages.push(i);
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    $scope.open = function () {

        // настраивается подобно angular-route: указываются шаблон и контроллер
        var modalInstance = $uibModal.open({
            templateUrl: 'createDialog.html',
            controller: 'createDialogController',

            // у сервиса есть несчетное количество найстроек типа размера, анимации и т.п.
            size: 'sm',
            animation: true
        });
    }
    $scope.openUpdateDialog = function(index){

        var id = $('input[name=updateCompetitorId_'+ index +']').val();
        id = parseInt(id);

        $http.get('/user/'+id)
            .success(function(result){
                $scope.modelFormUpdate = {
                    id: result.id,
                    fio: result.fio,
                    sex: result.sex,
                    contact: result.contact,
                    date: result.date,
                    start_time: result.start_time,
                    end_time: result.end_time
                };
                // настраивается подобно angular-route: указываются шаблон и контроллер
                $uibModal.open({
                    templateUrl: 'updateDialog.html',
                    controller: 'updateDialogController',

                    // у сервиса есть несчетное количество найстроек типа размера, анимации и т.п.
                    size: 'sm',
                    animation: true,

                    // пробрасываемые в контроллер данные.
                    resolve: {
                        modelFormUpdate: function () {
                            return $scope.modelFormUpdate;
                        }
                    }
                });
            })
            .error(function(response){
                console.log('Error: ' + ' forSingleUser');
            });
    }
    $scope.delete = function(index){
        if(confirm("Удалить запись?")){
            var id = $('input[name=deleteCompetitorId_' + index +']').val();
            $http.delete('/users/'+id)
                .success(function(response) {
                    window.location.reload();
                })
                .error(function(response) {
                    console.log('Error: ' + response);
                });
        }
    }
        $scope.serachCompetitor = function() {
            var data = {
                search: $scope.search
            };
            localStorageService.set('dataSearch', data);
        }
}]);
