//********************************************LOAD*****************************************************************
function addClick() {
    $("#btnLogin").click(function() {
        compareUser();
    });
    $("#btnAddStudent").click(function() {
        saveStudent();
    });
    $("#btnAddCarrer").click(function() {
        saveCarrer();
    });
    $("#btnAddUser").click(function() {
        saveUser();
    });
}

function addUserAdmin() {
    var arrayUserAdmin = {
        idUser: "1",
        nameUser: "Jason",
        firstNameUser: "Gamboa",
        lastNameUser: "Solano",
        dniUser: "207220239",
        user: "admin",
        passwordUser: "admin",
        roleUser: "Administrator"
    };
    var users = JSON.parse(localStorage.getItem('users'));

    if (users == null) {
        users = [];
        users.push(arrayUserAdmin);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

//********************************************USER*********************************************************************
function loadUser() {
    var users = JSON.parse(localStorage.getItem('users'));
    var inputUser = "<tr>";
    inputUser += "<th>Name</th><th>First Name</th><th>Last Name</th>";
    inputUser += "<th>DNI</th><th>User</th><th>Paswword</th><th>Role</th><th>Option</th>";
    inputUser += '<th><a href="agregarUsuario.html" type="button" class="btn btn-default " id="btnAddNewUser"><span class="glyphicon glyphicon-plus-sign"></span></a></th></tr>';

    if (users != null) {
        for (var i = 0; i < users.length; i++) {
            if (users[i] != undefined) {
                inputUser += '<tr><td>' + users[i].firstNameUser + '</td><td>' + users[i].lastNameUser + '</td>';
                inputUser += '<td>' + users[i].dniUser + '</td><td>' + users[i].user + '</td>';
                inputUser += '<td>' + users[i].passwordUser + '</td><td>' + users[i].roleUser + '</td>';
                inputUser += '<td><a type="button" class="btn btn-default editUser" id="' + users[i].dniUser + '"><span class="glyphicon glyphicon-edit"></span></a>';
                inputUser += '<a href="#" type="button" class="delete btn btn-default" id="' + users[i].dniUser + '"><span class="glyphicon glyphicon-minus-sign"></span></a></td>';
                inputUser += '</tr>';
            }
        }
    }
    document.getElementById('tableUser').innerHTML = inputUser;
    deleteUser();
    modalEditUser();
}


function saveUser() {
    var users = [];
    var condition = false;
    var nameUser = document.getElementById('nameUser').value;
    var firstNameUser = document.getElementById('firstNameUser').value;
    var lastNameUser = document.getElementById('lastNameUser').value;
    var dniUser = document.getElementById('dniUser').value;
    var user = document.getElementById('user').value;
    var passwordUser = document.getElementById('passwordUser').value;
    var roleUser = document.getElementById('roleUser').value;
    var confirmPasswrduser = confirmPassword();

    if (confirmPasswrduser == true) {
        var arrayUser = {
            "nameUser": nameUser,
            "firstNameUser": firstNameUser,
            "lastNameUser": lastNameUser,
            "dniUser": dniUser,
            "user": user,
            "passwordUser": passwordUser,
            "roleUser": roleUser
        };

        users = JSON.parse(localStorage.getItem('users'));

        if (users === null) {
            users = [];
        }

        for (var i = 0; i < users.length; i++) {

            if (users[i].dniUser === dniUser) {
                alert("Este Usuario ya fue agregado");
                condition = true;
            }
        }
        if (condition === false) {
            // agregar el estudiante
            users.push(arrayUser);
            localStorage.setItem('users', JSON.stringify(users));
        }
    } else {
        alert("Password no match");
    }
}

function editUser(dniUserEdit) {
    var users = [];
    var condition = false;
    var idUser = document.getElementById('idUser').value;
    var nameUser = document.getElementById('nameUser').value;
    var firstNameUser = document.getElementById('firstNameUser').value;
    var lastNameUser = document.getElementById('lastNameUser').value;
    var dniUser = document.getElementById('dniUser').value;
    var user = document.getElementById('userUser').value;
    var passwordUser = document.getElementById('passwordUser').value;
    var roleUser = document.getElementById('roleUser').value;

    var arrayUser = {
        "idUser": idUser,
        "nameUser": nameUser,
        "firstNameUser": firstNameUser,
        "lastNameUser": lastNameUser,
        "dniUser": dniUser,
        "user": user,
        "passwordUser": passwordUser,
        "roleUser": roleUser
    };

    var users = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < users.length; i++) {

        if (users[i].idUser == dniUserEdit) {
            users[i] = arrayUser;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    $("#myModal-Admin").modal("hide");
    loadUser();
}

function deleteUser() {
    $(".delete").click(function() {
        var dniUser = $(this).attr("id");
        var arrayUsers = [];
        var users = JSON.parse(localStorage.getItem('users'));
        var compareUser;
        for (var i = 0; i < users.length; i++) {

            if (users[i] != undefined) {
                compareUser = users[i].dniUser;
                if (compareUser == dniUser) {
                    delete arrayUsers[i];
                    arrayUsers.push(arrayUsers[i + 1]);
                    break;
                } else {
                    arrayUsers.push(arrayUsers[i]);
                }
            }
        };
        localStorage.setItem('users', JSON.stringify(arrayUsers));
        document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Usuario eliminado con exito!</div>';

        loadUser();
        deleteUser();
    });
}


function modalEditUser() {
    $(".editUser").click(function() {
        var dniUser = $(this).attr("id");
        var user = JSON.parse(localStorage.getItem('users'));

        for (var i = 0; i < user.length; i++) {
            if (user[i].dniUser == dniUser) {
                var inputUser = '<div class="col-lg-6">'
                inputUser += '<div class="input-group"><span class="input-group-addon">ID</span><input value="' + user[i].idUser + '" type="text" class="form-control" id="idUser"></div><br>';
                inputUser += '<div class="input-group"><span class="input-group-addon">DNI</span><input value="' + user[i].dniUser + '" type="text" class="form-control" id="dniUser"></div><br>';
                inputUser += '<div class="input-group"><span class="input-group-addon">Name</span><input value="' + user[i].nameUser + '" type="text" class="form-control" id="nameUser"></div><br>';
                inputUser += '<div class="input-group"><span class="input-group-addon">First Name</span><input value="' + user[i].firstNameUser + '" type="text" class="form-control" id="firstNameUser"></div><br>';
                inputUser += '</div><div class="input-group"><span class="input-group-addon">Last Name</span><input value="' + user[i].lastNameUser + '" type="text" class="form-control" id="lastNameUser"></div><br>';
                inputUser += '<div class="input-group"><span class="input-group-addon">User</span><input value="' + user[i].user + '" type="text" class="form-control" id="userUser"></div><br>';
                inputUser += '<div class="input-group"><span class="input-group-addon">Paswword</span><input value="' + user[i].passwordUser + '" type="text" class="form-control" id="passwordUser"></div><br>';
                inputUser += '<div class="input-group"><span class="input-group-addon">Role</span><input value="' + user[i].roleUser + '" type="text" class="form-control" id="roleUser"></div><br>';
            }
        }
        document.getElementById('myModalBodyEdit').innerHTML = inputUser;
        selectRole();
        $("#btnEdit").click(function() {
            editUser(dniUser);
        });
        $("#myModal-Admin").modal("show");
    });
}


function compareUser() {

    var userLogin = document.getElementById('userLogin').value;
    var passwordLogin = document.getElementById('passwordLogin').value;
    var dataUser = JSON.parse(localStorage.getItem('users'));

    if (dataUser != null) {
        for (var i = 0; i < dataUser.length; i++) {
            if (dataUser[i].user === userLogin && dataUser[i].passwordUser === passwordLogin) {
                setTimeout("location.href='admin.html'", 0);

            }
        }
    }
}

function confirmPassword() {
    var confirm;
    //Store the password field objects into variables ...
    var passwordUser = document.getElementById('passwordUser');
    var confirmPasswordUser = document.getElementById('confirmPasswordUser');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if (passwordUser.value == confirmPasswordUser.value) {
        //The passwords match. 
        //Set the color to the good color and inform
        //the user that they have entered the correct password 
        confirmPasswordUser.style.backgroundColor = goodColor;
        confirm = true;
    } else {
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        confirmPasswordUser.style.backgroundColor = badColor;
        confirm = false;
    }

    return confirm;
}

function selectRole() {
    $(".select").click(function() {
        var reason = $(this).attr("id");
        $("#roleUser").val(reason);
    });
}

//********************************************STUDENT*********************************************************************
function loadStudents() {
    var students = JSON.parse(localStorage.getItem('students'));
    var inputStudent = "<tr>";
    inputStudent += "<th>Name</th><th>DNI</th><th>Carrer</th><th>English</th><th>Option</th>";
    inputStudent += '<th><a href="agregarEstudiante.html" type="button" class="btn btn-default " id="btnAddNewStudents"><span class="glyphicon glyphicon-plus-sign"></span></a></th></tr>';

    if (students != null) {
        for (var i = 0; i < students.length; i++) {
            if (students[i] != undefined) {
                inputStudent += '<tr><td>' + students[i].nameStudent + '</td><td>' + students[i].dniStudent + '</td>';
                inputStudent += '<td>' + students[i].carrerStudent + '</td><td>' + students[i].enghlishStudent + '</td>';
                inputStudent += '<td><a type="button" class="btn btn-default editStudent" id="' + students[i].dniStudent + '"><span class="glyphicon glyphicon-edit"></span></a>';
                inputStudent += '<a  type="button" class="btn btn-default delete" id="' + students[i].dniStudent + '"><span class="glyphicon glyphicon-minus-sign"></span></a></td>';
                inputStudent += '</tr>';
            }
        }

    }
    document.getElementById('tableStudent').innerHTML = inputStudent;

    deleteStudents();
    modalEditStudent();
}

function saveStudent() {
    var students = [];
    var condition = false;
    var imageStudent = document.getElementById('imageStudent').value;
    var nameStudent = document.getElementById('nameStudent').value;
    var dniStudent = document.getElementById('dniStudent').value;
    var carrerStudent = document.getElementById('carrerStudent').value;
    var enghlishStudent = document.getElementById('enghlishStudent').value;

    var arrayStudent = {
        "dniStudent": dniStudent,
        nameStudent: nameStudent,
        "carrerStudent": carrerStudent,
        "enghlishStudent": enghlishStudent
    };

    students = JSON.parse(localStorage.getItem('students'));

    if (students === null) {
        students = [];
    }

    for (var i = 0; i < students.length; i++) {

        if (students[i].dniStudent === dniStudent) {
            alert("Este Estudiante ya fue agregado");
            condition = true;
        }
    }
    if (condition === false) {
        // agregar el estudiante
        //students.push(arrayStudent);
        //localStorage.setItem('students', JSON.stringify(students));

    }
}

function editStudent(dniStudentEdit) {
    var students = [];
    var nameStudent = document.getElementById('nameStudent').value;
    var dniStudent = document.getElementById('dniStudent').value;
    var carrerStudent = document.getElementById('carrerStudent').value;
    var enghlishStudent = document.getElementById('enghlishStudent').value;

    var arrayStudent = {
        "dniStudent": dniStudent,
        nameStudent: nameStudent,
        "carrerStudent": carrerStudent,
        "enghlishStudent": enghlishStudent
    };

    students = JSON.parse(localStorage.getItem('students'));

    for (var i = 0; i < students.length; i++) {

        if (students[i].dniStudent == dniStudentEdit) {
            students[i] = arrayStudent;
            localStorage.setItem('students', JSON.stringify(students));
        }
    }

    $("#myModal-Admin").modal("hide");
    loadStudents();
}

function deleteStudents() {
    $(".delete").click(function() {
        var dniStudent = $(this).attr("id");
        var arrayStudents = [];
        var stundents = JSON.parse(localStorage.getItem('students'));
        var comparestundents;
        for (var i = 0; i < stundents.length; i++) {

            if (stundents[i] != undefined) {
                comparestundents = stundents[i].dniStudent;
                if (comparestundents == dniStudent) {
                    delete stundents[i];
                    arrayStudents.push(stundents[i + 1]);
                    break;
                } else {
                    arrayStudents.push(stundents[i]);
                }
            }
        };
        localStorage.setItem('students', JSON.stringify(arrayStudents));
        document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Estudiante eliminado con exito!</div>';

        loadStudents();
        deleteStudents();
    });
}


function modalEditStudent() {
    $(".editStudent").click(function() {
        var dniStudent = $(this).attr("id");
        var student = JSON.parse(localStorage.getItem('students'));

        for (var i = 0; i < student.length; i++) {
            if (student[i].dniStudent == dniStudent) {
                var inputStudent = '<div class="col-lg-6">'
                inputStudent += '<div class="input-group"><span class="input-group-addon">DNI</span><input value="' + student[i].dniStudent + '" type="text" class="form-control" id="dniStudent"></div><br>';
                inputStudent += '<div class="input-group"><span class="input-group-addon">Name</span><input value="' + student[i].nameStudent + '" type="text" class="form-control" id="nameStudent"></div><br>';
                inputStudent += '</div><div class="input-group"><span class="input-group-addon">Carrer</span><input type="text" class="form-control" id="carrerStudent" readonly="readonly" value="' + student[i].carrerStudent + '">';
                inputStudent += '<div class="input-group-btn"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"id="btnDropDownCarrer"><span class="caret"></span></button>';
                inputStudent += '<ul class="dropdown-menu dropdown-menu-right" role="menu" id="dropdownCarrerStudents"></ul></div></div><br>';
                inputStudent += '<div class="input-group"><span class="input-group-addon">English</span><input value="' + student[i].enghlishStudent + '" type="text" class="form-control" id="enghlishStudent"></div><br>';

            }
        }
        document.getElementById('myModalBodyEdit').innerHTML = inputStudent;
        loadDropDown();
        $("#btnEdit").click(function() {
            editStudent(dniStudent);
        });
        $("#myModal-Admin").modal("show");
    });
}

function selectCarrer() {
    $(".select").click(function() {
        var reason = $(this).attr("id");
        $("#carrerStudent").val(reason);
    });
}

function loadDropDown() {
    var carrers = JSON.parse(localStorage.getItem('carrers'));
    var inputStudent = '<li class="Divider"></li>';
    if (carrers != null) {
        for (var i = 0; i < carrers.length; i++) {
            if (carrers[i] != undefined) {
                inputStudent += '<li><a class="select" id="' + carrers[i].nameCarrer + '" href="#"> ' + carrers[i].nameCarrer + '</a></li>';
            }
        }
    }
    document.getElementById('dropdownCarrerStudents').innerHTML = inputStudent;
    selectCarrer();

}

//********************************************CARRER*********************************************************************

function loadCarrer() {
    var carrers = JSON.parse(localStorage.getItem('carrers'));
    var inputCarrer = "<tr>";
    inputCarrer += "<th>code</th><th>Name</th><th>Option</th>";
    inputCarrer += '<th><a href="agregarCarrera.html" type="button" class="btn btn-default " id="btnAddNewCarrer"><span class="glyphicon glyphicon-plus-sign"></span></a></th></tr>';

    if (carrers != null) {
        for (var i = 0; i < carrers.length; i++) {
            if (carrers[i] != undefined) {
                inputCarrer += '<tr><td>' + carrers[i].codeCarrer + '</td>';
                inputCarrer += '<td>' + carrers[i].nameCarrer + '</td>';
                inputCarrer += '<td><a type="button" class="btn btn-default editCarrer" id="' + carrers[i].nameCarrer + '"><span class="glyphicon glyphicon-edit"></span></a>';
                inputCarrer += '<a "type="button" class="btn btn-default delete" id="' + carrers[i].nameCarrer + '"><span class="glyphicon glyphicon-minus-sign"></span></a></td>';
                inputCarrer += '</tr>';
            }
        }
    }
    document.getElementById('tableCarrer').innerHTML = inputCarrer;
    deleteCarrer();
    modalEditCarrer();
}


function saveCarrer() {
    var carrers = [];
    var condition = false;
    var codeCarrer = document.getElementById('codeCarrer').value;
    var nameCarrer = document.getElementById('nameCarrer').value;

    var arrayCarrer = {
        "codeCarrer": codeCarrer,
        "nameCarrer": nameCarrer
    };

    var carrers = JSON.parse(localStorage.getItem('carrers'));
    if (carrers === null) {
        carrers = [];
    }

    for (var i = 0; i < carrers.length; i++) {

        if (carrers[i].nameCarrer == nameCarrer) {
            alert("Esta Carrera ya fue agregada");
            condition = true;
        }
    }

    if (condition === false) {
        // agregar el estudiante
        carrers.push(arrayCarrer);
        localStorage.setItem('carrers', JSON.stringify(carrers));
    }
}

function editCarrer(nameCarrerEdit) {
    var carrers = [];
    var condition = false;
    var codeCarrer = document.getElementById('codeCarrer').value;
    var nameCarrer = document.getElementById('nameCarrer').value;

    var arrayCarrer = {
        "codeCarrer": codeCarrer,
        "nameCarrer": nameCarrer
    };

    var carrers = JSON.parse(localStorage.getItem('carrers'));

    for (var i = 0; i < carrers.length; i++) {

        if (carrers[i].codeCarrer == nameCarrerEdit) {
            carrers[i] = arrayCarrer;
            localStorage.setItem('carrers', JSON.stringify(carrers));
        }
    }

    $("#myModal-Admin").modal("hide");
    loadCarrer();
}


function deleteCarrer() {
    $(".delete").click(function() {
        var nameCarrer = $(this).attr("id");
        var arrayCarrer = [];
        var carrer = JSON.parse(localStorage.getItem('carrers'));
        var compareCarrer;
        for (var i = 0; i < carrer.length; i++) {

            if (carrer[i] != undefined) {
                compareCarrer = carrer[i].nameCarrer;
                if (compareCarrer == nameCarrer) {
                    delete carrer[i];
                    arrayCarrer.push(carrer[i + 1]);
                    break;
                } else {
                    arrayCarrer.push(carrer[i]);
                }
            }
        };
        localStorage.setItem('carrers', JSON.stringify(arrayCarrer));
        document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Carrera eliminada con exito!</div>';

        loadCarrer();
        deleteCarrer();
    });
}

function modalEditCarrer() {
    $(".editCarrer").click(function() {
        var nameCarrer = $(this).attr("id");
        var carrer = JSON.parse(localStorage.getItem('carrers'));

        for (var i = 0; i < carrer.length; i++) {
            if (carrer[i].nameCarrer == nameCarrer) {
                var inputCarrer = '<div class="input-group"><span class="input-group-addon">code</span><input value="' + carrer[i].codeCarrer + '" type="text" class="form-control" id="codeCarrer"></div><br>';
                inputCarrer += '<div class="input-group"><span class="input-group-addon">Name</span><input value="' + carrer[i].nameCarrer + '" type="text" class="form-control" id="nameCarrer"></div></div></div>';
            }
        }
        document.getElementById('myModalBodyEdit').innerHTML = inputCarrer;
        $("#btnEdit").click(function() {
            editCarrer(nameCarrer);
        });
        $("#myModal-Admin").modal("show");
    });
}
