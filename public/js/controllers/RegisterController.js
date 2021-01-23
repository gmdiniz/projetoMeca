meca_app.controller('RegisterController', function ($scope, $http, $location) {
    $scope.registerData = {};

    $scope.register = function () {

        var request =  $http({
            method: "POST",
            url: "http://localhost/projetoMeca/public/server/register.php",
            data: $scope.registerData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        request.then(function (result) {
            console.log(result);
        })
    
    };

    $scope.login = function () {
        $location.path('/login');  
    }
});