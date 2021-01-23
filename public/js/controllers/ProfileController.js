meca_app.controller('ProfileController', function ($scope, UserModel, $location) {
    
    $scope.logout = function () {
        UserModel.clearData();
        location.reload();
    }
    
    $scope.home = function () {
        $location.path('/home');  
    }

    $scope.menu = [
        {
            text: 'Meu perfil',
            link: 'meu-perfil',
        },
        {
            text: 'Atividades',
            link: 'atividades',
        },
    ];
});