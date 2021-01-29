meca_app.controller('HomeController', function ($scope, $http, UserModel, $location) {

    $scope.loggedUser = UserModel.isUserLoggedIn();
    $scope.user = UserModel.getUserData();
    $scope.registerData = {};

    $scope.login = function () {
        $location.path('/login');  
    }
    
    $scope.cadastro = function () {
        $location.path('/register');  
    }

    $scope.logout = function () {
        UserModel.clearData();
        location.reload();
    }

    $scope.meuPerfil = function () {
        $location.path('/profile');
    }

    $scope.cadastrarManutencao = function () {
        var request = $http({
            url: 'http://localhost/projetoMeca/public/server/cadastroManutencao.php',
            method: "post",
            data: {
                tipo: $scope.registerData.tipo,
                valor: $scope.registerData.valor,
                descricao: $scope.registerData.descricao,
                carId: $scope.registerData.carro.id_veiculo,
                userId: $scope.user.id
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.then(function (response) {
            if (response.data.status == 'ok') {
                alert('Manutencao OK');
            } else {
                alert('Ocorreu um erro ao cadastrar a manutenção. \nVerifique os dados e tente novamente!');
            }
        })
    }

    $scope.loadVeiculos = function () {
        var request = $http({
            url: 'http://localhost/projetoMeca/public/server/loadVeiculo.php',
            method: "post",
            data: {
                userId: $scope.user.id
            },            
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.then(function (response) {
            if (response.status == '200') {
                $scope.loadedVeiculos = response.data;
            } else {
                alert('Ocorreu um erro ao carregar seus veículos.');
            }
        })
    }

    if ($scope.user) {   
        $scope.loadVeiculos();
    }

});
