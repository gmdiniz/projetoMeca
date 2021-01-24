meca_app.controller('ProfileController', function ($scope, UserModel, $location) {
    
    $scope.logout = function () {
        UserModel.clearData();
        location.reload();
    }

    $scope.user = UserModel.getUserData();
    
    $scope.home = function () {
        $location.path('/home');  
    }

    $scope.menu = [
        {
            text: 'Meu perfil',
            link: 'meu-perfil',
        },
        {
            text: 'Meus chamados',
            link: 'meus-chamados',
        },
        {
            text: 'Meus veículos',
            link: 'meus-veiculos'
        }
    ];
});