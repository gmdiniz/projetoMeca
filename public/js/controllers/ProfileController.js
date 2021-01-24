meca_app.controller('ProfileController', function ($scope, UserModel, $location) {
    
    $scope.veiculoData = {};

    $scope.logout = function () {
        UserModel.clearData();
        location.reload();
    }

    $scope.cadastrarVeiculo = function () {
        if (UserModel.isUserLoggedIn()) var userId = UserModel.getID();
        else userId = 0;

        var request = $http({
            url: 'http://localhost/projetoForum/public/server/cadastroVeiculo.php',
            method: "post",
            data: $scope.veiculoData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.then(function (response) {
            if (response.data.status == 'ok') {
                alert('Veículo cadastrado');
            } else {
                alert('Ocorreu um erro ao cadastrar o Veículo. \nVerifique os dados e tente novamente!');
            }
        })
    }

    $scope.user = UserModel.getUserData();
    
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
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
            text: 'Meus chamados',
            link: 'meus-chamados',
        },
        {
            text: 'Meus veículos',
            link: 'meus-veiculos'
        }
    ];
});