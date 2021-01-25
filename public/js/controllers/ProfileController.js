meca_app.controller('ProfileController', function ($scope, $http, UserModel, $location) {
    
    $scope.veiculoData = {};
    $scope.chamadoData = {};
    $scope.manutencaoData = {};
    $scope.registerData = {};

    $scope.user = UserModel.getUserData();

    $scope.logout = function () {
        UserModel.clearData();
        location.reload();
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

    $scope.loadVeiculos();

    $scope.cadastrarVeiculo = function () {
        var request = $http({
            url: 'http://localhost/projetoMeca/public/server/cadastroVeiculo.php',
            method: "post",
            data: {
                modelo: $scope.veiculoData['modelo'],
                marca: $scope.veiculoData['marca'],
                placa: $scope.veiculoData['placa'],
                cor: $scope.veiculoData['cor'],
                ano: $scope.veiculoData['ano'],
                userId: $scope.user.id
            },            
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.then(function (response) {
            if (response.data.status == 'ok') {
                alert('Veículo cadastrado');
                veiculoModal.style.display = "none";
            } else {
                alert('Ocorreu um erro ao cadastrar o Veículo. \nVerifique os dados e tente novamente!');
            }
        })
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
                $scope.manutencaoData = response.data;
            } else {
                alert('Ocorreu um erro ao cadastrar a manutenção. \nVerifique os dados e tente novamente!');
            }
        })
    }
    
    var veiculoModal = document.getElementById("veiculoModal");
    var chamadoModal = document.getElementById("chamadoModal");

    // Get the button that opens the modal
    var veiculoBtn = document.getElementById("veiculoBtn");
    var chamadoBtn = document.getElementById("chamadoBtn");

    // Get the <span> element that closes the modal
    var spanVeiculo = document.getElementById("closeVeiculo");
    var spanChamado = document.getElementById("closeChamado");

    // When the user clicks the button, open the modal 
    veiculoBtn.onclick = function() {
        veiculoModal.style.display = "block";
    }
    chamadoBtn.onclick = function() {
        chamadoModal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    spanVeiculo.onclick = function() {
        veiculoModal.style.display = "none";
    }
    spanChamado.onclick = function() {
        chamadoModal.style.display = "none";
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