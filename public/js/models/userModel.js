meca_app.service('UserModel', function () {
    var useremail;
    var loggedin = false;
    var id;

    this.setEmail = function (email) {
        useremail = email;
    };
    this.getEmail = function () {
        return useremail;
    };

    this.setID = function (userID) {
        id = userID;
    };
    this.getID = function () {
        return id;
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
        useremail = data.user;
        id = data.id;
        console.log(id);
        loggedin = true;
        localStorage.setItem('login', JSON.stringify({
             useremail: useremail,
             id: id
           }))
    };

    this.clearData = function () {
        localStorage.removeItem('login');
        useremail = '';
        id = "";
        loggedin = false;
    }

})