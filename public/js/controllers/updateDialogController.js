app.controller('updateDialogController', ['$scope','$uibModal', "$uibModalInstance", "$http", "modelFormUpdate",
    function ($scope, $uibModal, $uibModalInstance, $http, modelFormUpdate) {

        $scope.regex = /^[a-zA-Z0-9а-яА-Я]*$/;

        $scope.modelFormUpdate = modelFormUpdate;

        $scope.submitForm = function () {
            var id = $scope.modelFormUpdate.id;
            id = parseInt(id);
            console.log($scope.modelForm);
            $http({
                method  : 'PUT',
                url     : '/users/'+ id,
                data:  this.modelFormUpdate,
                headers : { 'Content-Type': 'application/json' }
            })
                .success(function(data) {
                    $uibModalInstance.close('Обновление успешно завершено.');
                    window.location.reload();
                })
                .error(function(data){
                    console.log('Error: ' + data);
                });
        };
    }]);