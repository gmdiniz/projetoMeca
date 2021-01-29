meca_app.service('UserModel', function () {
    var userData = {};
    var loggedin = false;

    this.getUserData = function () {
        return JSON.parse(localStorage.getItem('login'));
    };
    
    this.isUserLoggedIn = function () {
        if (!!localStorage.getItem('login')) {
            loggedin = true;
            var data = JSON.parse(localStorage.getItem('login'))
            useremail = data.useremail;
            id = data.id;
        }
        return loggedin;
    };
  
    this.saveData = function (data) {
        userData = {
            'email': data.email,
            'id': data.id,
            'created': data.created,
            'username': data.nome ? data.nome : data.username,
            'cpf': data.cpf,
            'loggedin': true,
            'lastAccess': new Date(Date.now())
        }
        localStorage.setItem('login', JSON.stringify(userData))
    };

    this.clearData = function () {
        localStorage.removeItem('login');
        useremail = '';
        id = "";
        loggedin = false;
    }

})