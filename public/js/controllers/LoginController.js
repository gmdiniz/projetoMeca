meca_app.controller('LoginController', function ($scope, $http, $location, UserModel) {
    $scope.login = function () {
        var request = $http({
            url: 'http://localhost/projetoMeca/public/server/login.php',
            method: "post",
            data: {
                email: $scope.email,
                senha: $scope.senha
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.then(function (response) {
            if (response.data.status == 'loggedin') {
                UserModel.saveData(response.data);
                $location.path('/home');
            } else {
                alert('Login inválido');
            }
        })
    }
    
    $scope.cadastro = function () {
        $location.path('/register');  
    }
});
