app.controller('createDialogController', ['$scope','$uibModal', "$uibModalInstance", "$http",
    function ($scope, $uibModal, $uibModalInstance, $http) {
        $scope.regex = /^[a-zA-Z0-9а-яА-Я]*$/;
        $scope.modelForm = {
            Name: "",
            Family: "",
            Lastname: "",
            sex: "",
            contact: ""
        };
        $scope.submitForm = function () {
            $http({
                method  : 'POST',
                url     : '/insert',
                data:  this.modelForm,
                headers : { 'Content-Type': 'application/json' }
            })
                .success(function(data, status) {
                    $uibModalInstance.close('Запись добавлена успешно.');
                    window.location.reload();
                })
                .error(function(data){
                    console.log('Error: ' + data);
                });
        };
    }]);
