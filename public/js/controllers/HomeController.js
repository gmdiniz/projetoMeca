meca_app.controller('HomeController', function ($scope, $http, UserModel, $location) {

    $scope.loggedUser = UserModel.isUserLoggedIn();

    $scope.callPosts = function() {
        var request = $http({
            url: 'http://localhost/projetoForum/public/server/home.php',
            method: "post",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.then(function (response) {
            if (response.data != 'error') {
                $scope.publicacoes = response.data;
                $scope.myperguntas = {};
                for (var pergunta in $scope.publicacoes) {
                    if ($scope.publicacoes[pergunta].fk_usuario === UserModel.getID()) {
                        $scope.myperguntas[pergunta] = $scope.publicacoes[pergunta];
                    }
                }
            } else {
                console.log('Deu erro');
            }
        })
    }

    $scope.callPosts();

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
});
