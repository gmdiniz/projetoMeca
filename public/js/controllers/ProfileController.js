meca_app.controller('ProfileController', function ($scope, $http, UserModel, $location) {
    
    $scope.veiculoData = {};
    $scope.chamadoData = {};
    $scope.manutencaoData = {};
    $scope.registerData = {};
    $scope.actualOpenedManut = {};
    $scope.actualOpenedCar = {};

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
    
    $scope.loadManut = function () {
        var request = $http({
            url: 'http://localhost/projetoMeca/public/server/loadManut.php',
            method: "post",
            data: {
                userId: $scope.user.id
            },            
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.then(function (response) {
            if (response.status == '200') {
                $scope.loadedManut = response.data;
            } else {
                alert('Ocorreu um erro ao carregar seus chamados.');
            }
        })
    }
    
    if ($scope.user) {
        $scope.loadVeiculos();
        $scope.loadManut();
    }
    
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
                location.reload();
                veiculoModal.style.display = "none";
            } else {
                alert('Ocorreu um erro ao cadastrar o Veículo. \nVerifique os dados e tente novamente!');
                location.reload();
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
                location.reload();
                $scope.manutencaoData = response.data;
            } else {
                alert('Ocorreu um erro ao cadastrar a manutenção. \nVerifique os dados e tente novamente!');
                location.reload();
            }
        })
    }

    $scope.loadEditManutModal = function (manut) {
        $scope.editManutModal = document.getElementById("editManutModal");

        // Get the <span> element that closes the modal
        $scope.manutModalspan = document.getElementById("closeManutModal");

        // When the user clicks on <span> (x), close the modal
        $scope.manutModalspan.onclick = function() {
            $scope.editManutModal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == 'modal') {
                $scope.editManutModal.style.display = "none";
            }
        }
        $scope.editManutModal.style.display = "block";

        $scope.actualOpenedManut = manut;
    }

    $scope.deleteUser = function (user) {
        var request = $http({
            url: 'http://localhost/projetoMeca/public/server/deleteUser.php',
            method: "post",
            data: {
                user_id: user.id,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.then(function (response) {
            if (response.data.status == 'ok') {
                alert('Seu usuario foi deletado');
                $scope.logout()
                location.reload();
                $location.path('/home');  
            } else {
                alert('Ocorreu um erro ao tentar deletar seu usuario.');
                location.reload();
            }
        })
    }

    $scope.editarUsuario = function (currentUser, newestUser) {
        var newUserData = {
            email: newestUser.email,
            nome: newestUser.nome,
            cpf: newestUser.cpf,
            id: currentUser.id 
        }
        
        var request = $http({
            url: 'http://localhost/projetoMeca/public/server/editUser.php',
            method: "post",
            data: newUserData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.then(function (response) {
            if (response.data.status == 'ok') {
                alert('Usuario atualizado com sucesso');
                $scope.editUserModal.style.display = "none";
                var newUserSession = {
                    'email': newUserData.email,
                    'id': newUserData.id,
                    'nome': newUserData.nome,
                    'cpf': newUserData.cpf,
                    'loggedin': true,
                    'lastAccess': new Date(Date.now())
                }
                UserModel.saveData(newUserSession)
                
                location.reload();
            } else {
                alert('Ocorreu um erro ao tentar atualizar seu usuário. \nVerifique os dados e tente novamente!');
            }
        })
    }

    $scope.loadEditUserModal = function () {
        $scope.editUserModal = document.getElementById("editUserModal");

        // Get the <span> element that closes the modal
        $scope.userModalspan = document.getElementById("closeUserModal");

        // When the user clicks on <span> (x), close the modal
        $scope.userModalspan.onclick = function() {
            $scope.editUserModal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == 'modal') {
                $scope.editUserModal.style.display = "none";
            }
        }
        $scope.editUserModal.style.display = "block";
    }
    
    $scope.loadEditCarModal = function (car) {
        $scope.editCarModal = document.getElementById("editCarModal");

        // Get the <span> element that closes the modal
        $scope.carModalspan = document.getElementById("closeCarModal");

        // When the user clicks on <span> (x), close the modal
        $scope.carModalspan.onclick = function() {
            $scope.editCarModal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == 'modal') {
                $scope.editCarModal.style.display = "none";
            }
        }
        $scope.editCarModal.style.display = "block";

        $scope.actualOpenedCar = car;
    }

    $scope.deleteManut = function (manut) {
        var request = $http({
            url: 'http://localhost/projetoMeca/public/server/deleteManut.php',
            method: "post",
            data: {
                manut_id: manut.id_manut,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.then(function (response) {
            if (response.data.status == 'ok') {
                alert('Manutencao deletada com sucesso');
                location.reload();
            } else {
                alert('Ocorreu um erro ao tentar deletar a manutenção.');
                location.reload();
            }
        })
    }
    
    $scope.deleteVeiculo = function (car) {
        var request = $http({
            url: 'http://localhost/projetoMeca/public/server/deleteCar.php',
            method: "post",
            data: {
                car_id: car.id_veiculo,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.then(function (response) {
            if (response.data.status == 'ok') {
                alert('Veículo deletado com sucesso');
                location.reload();
            } else {
                alert('Ocorreu um erro ao tentar deletar este veículo.');
                location.reload();
            }
        })
    }

    $scope.editarManutencao = function (currentManut, newestManut) {
        var request = $http({
            url: 'http://localhost/projetoMeca/public/server/editManut.php',
            method: "post",
            data: {
                valor: newestManut.valor,
                tipo: newestManut.tipo,
                descricao: newestManut.descricao,
                manut_id: currentManut.id_manut,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.then(function (response) {
            if (response.data.status == 'ok') {
                alert('Manutencao atualizada com sucesso');
                $scope.editManutModal.style.display = "none";
                location.reload();
            } else {
                alert('Ocorreu um erro ao tentar atualizar a manutenção. \nVerifique os dados e tente novamente!');
                location.reload();
            }
        })
    }
    

    $scope.editarVeiculo = function (currentCar, newestCar) {
        var request = $http({
            url: 'http://localhost/projetoMeca/public/server/editCar.php',
            method: "post",
            data: {
                modelo: newestCar.modelo,
                ano: newestCar.ano,
                marca: newestCar.marca,
                placa: newestCar.placa,
                cor: newestCar.cor,
                id_veiculo: currentCar.id_veiculo
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.then(function (response) {
            if (response.data.status == 'ok') {
                alert('Veiculo atualizado com sucesso');
                location.reload();
                $scope.editCarModal.style.display = "none";
            } else {
                alert('Ocorreu um erro ao tentar atualizar as informações do veículo. \nVerifique os dados e tente novamente!');
                location.reload();
            }
        })
    }
    
    $scope.returnManutCar = function (manut) {
        var request = $http({
            url: 'http://localhost/projetoMeca/public/server/getManutCarRelation.php',
            method: "post",
            data: {
                user: manut['fk_usuario'],
                car_id: manut['fk_veiculo']
            },            
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.then(function (response) {
            if (response.status == '200') {
                return response.data[0];
            } else {
                alert('Ocorreu um erro ao carregar veiculos');
                location.reload();
            }
        })
    }
    
    
    $scope.veiculoModal = document.getElementById("veiculoModal");
    $scope.chamadoModal = document.getElementById("chamadoModal");

    // Get the button that opens the modal
    $scope.veiculoBtn = document.getElementById("veiculoBtn");
    $scope.chamadoBtn = document.getElementById("chamadoBtn");

    // Get the <span> element that closes the modal
    $scope.spanVeiculo = document.getElementById("closeVeiculo");
    $scope.spanChamado = document.getElementById("closeChamado");

    // When the user clicks the button, open the modal 
    $scope.veiculoBtn.onclick = function() {
        $scope.veiculoModal.style.display = "block";
    }
    $scope.chamadoBtn.onclick = function() {
        $scope.chamadoModal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    $scope.spanVeiculo.onclick = function() {
        $scope.veiculoModal.style.display = "none";
    }
    $scope.spanChamado.onclick = function() {
        $scope.chamadoModal.style.display = "none";
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