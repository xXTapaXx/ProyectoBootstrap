//********************************************LOAD*****************************************************************

//funcion para dar evento click a los botones
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

//Load chart
function LoadChart(){
    // Load the Visualization API and the piechart package.
                                google.load('visualization', '1.0', {
                                    'packages': ['corechart']
                                });

                                 // Set a callback to run when the Google Visualization API is loaded.
                                google.setOnLoadCallback(drawChart);

                                 // Callback that creates and populates a data table,
                                 // instantiates the pie chart, passes in the data and
                                 // draws it.
                                function drawChart() {

                                    // Create the data table.
                                    var data = new google.visualization.DataTable();
                                    data.addColumn('string', 'Topping');
                                    data.addColumn('number', 'Slices');
                                    data.addRows([
                                        ['Like', 3],
                                        ['No Like', 1],
                                    ]);

                                    // Set chart options
                                    var options = {
                                        'title': 'How many People who prefer isw?',
                                        'width': 1000,
                                        'height': 700
                                    };

                                    // Instantiate and draw our chart, passing in some options.
                                    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                                    chart.draw(data, options);
                                }
}

//Funcion para agregar el usuario Admin por defecto
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

//Funcion que carga los datos del usuario en la tabla
function loadUser() {
    var users = JSON.parse(localStorage.getItem('users'));
    var inputUser = "<tr>";
    inputUser += "<th>DNI</th><th>First Name</th><th>Last Name</th>";
    inputUser += "<th>Name</th><th>User</th><th>Paswword</th><th>Role</th>";
    inputUser += '<th><a href="agregarUsuario.html" type="button" class="btn btn-default " id="btnAddNewUser"><span class="glyphicon glyphicon-plus-sign"></span></a></th></tr>';

    if (users != null) {
        for (var i = 0; i < users.length; i++) {
            if (users[i] != undefined) {
                inputUser += '<tr><td>' + users[i].dniUser + '</td><td>' + users[i].firstNameUser + '</td>';
                inputUser += '<td>' + users[i].lastNameUser + '</td><td>' + users[i].nameUser + '</td><td>' + users[i].user + '</td>';
                inputUser += '<td>' + users[i].passwordUser + '</td><td>' + users[i].roleUser + '</td>';
                inputUser += '<td><a type="button" class="btn btn-default editUser" id="' + users[i].dniUser + '"><span class="glyphicon glyphicon-edit"></span></a>';
                inputUser += '<a href="#" type="button" class="deleteUser btn btn-default" id="' + users[i].dniUser + '"><span class="glyphicon glyphicon-minus-sign"></span></a></td>';
                inputUser += '</tr>';
            }
        }
    }
    document.getElementById('tableUser').innerHTML = inputUser;
    deleteUser();
    modalEditUser();
}
//Funcion para comparar si los espacios estan vacios
function inputUserEmpty() {
    var isEmpty = false;
    var nameUser = document.getElementById('nameUser').value;
    var firstNameUser = document.getElementById('firstNameUser').value;
    var lastNameUser = document.getElementById('lastNameUser').value;
    var dniUser = document.getElementById('dniUser').value;
    var user = document.getElementById('userUser').value;
    var passwordUser = document.getElementById('passwordUser').value;
    var roleUser = document.getElementById('roleUser').value;

    if (nameUser.length <= 0 || firstNameUser.length <= 0 || lastNameUser.length <= 0 || dniUser.length <= 0 || user.length <= 0 || passwordUser.length <= 0 || roleUser.length <= 0) {
        isEmpty = true;
    }

    return isEmpty;
}

//Funcion que salva los usuarios en localstorage
function saveUser() {
    var users = [];
    var condition = false;
    var nameUser = document.getElementById('nameUser').value;
    var firstNameUser = document.getElementById('firstNameUser').value;
    var lastNameUser = document.getElementById('lastNameUser').value;
    var dniUser = document.getElementById('dniUser').value;
    var user = document.getElementById('userUser').value;
    var passwordUser = document.getElementById('passwordUser').value;
    var roleUser = document.getElementById('roleUser').value;
    var confirmPasswrduser = confirmPassword();
    var inputEmpty = inputUserEmpty();
    if (inputEmpty != true) {
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
                var addAnotherUser = confirm("Want to add another User?");
                if (addAnotherUser == true) {
                    setTimeout("location.href='agregarUsuario.html'", 0);
                } else {
                    setTimeout("location.href='admin.html'", 0);
                }
            }
        } else {
            alert("Password no match");
        }
    } else {
        alert("You must fill all spaces");
    }
}

//Funcion para editar  usuario
function editUser(dniUserEdit) {
    var users = [];
    var condition = false;
    var nameUser = document.getElementById('nameUser').value;
    var firstNameUser = document.getElementById('firstNameUser').value;
    var lastNameUser = document.getElementById('lastNameUser').value;
    var dniUser = document.getElementById('dniUser').value;
    var user = document.getElementById('userUser').value;
    var passwordUser = document.getElementById('passwordUser').value;
    var roleUser = document.getElementById('roleUser').value;
    var confirmPasswrduser = confirmPassword();
    var inputEmpty = inputUserEmpty();
    if (inputEmpty != true) {
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

            var users = JSON.parse(localStorage.getItem('users'));

            for (var i = 0; i < users.length; i++) {

                if (users[i].dniUser == dniUserEdit) {
                    users[i] = arrayUser;
                    localStorage.setItem('users', JSON.stringify(users));
                }
            }

            $("#myModal-Admin").modal("hide");
            loadUser();
        } else {
            alert("Password no match");
        }
    } else {
        alert("You must fill all spaces");
    }
}

//Funcion para eliminar usuario
function deleteUser() {
    $(".deleteUser").click(function() {
        var dniUser = $(this).attr("id");
        var arrayUsers = [];
        var userLocalStorage = {};
        var users = JSON.parse(localStorage.getItem('users'));
        var compareUser;

        var deleteUser = confirm("are you sure you want to delete this user?");
        if (deleteUser == true) {
            for (var i = 0; i < users.length; i++) {

                if (users[i] != undefined) {
                    compareUser = users[i].dniUser;
                    if (compareUser == dniUser) {
                        delete users[i];

                        break;
                    }
                }
            }
            for (var i = 0; i < users.length; i++) {
                if (users[i] != undefined) {
                    userLocalStorage = {
                        "nameUser": users[i].nameUser,
                        "firstNameUser": users[i].firstNameUser,
                        "lastNameUser": users[i].lastNameUser,
                        "dniUser": users[i].dniUser,
                        "user": users[i].user,
                        "passwordUser": users[i].passwordUser,
                        "roleUser": users[i].roleUser
                    };
                    arrayUsers.push(userLocalStorage);
                }
            }

            localStorage.setItem('users', JSON.stringify(arrayUsers));
            //document.getElementById("mensaje").innerHTML = '<div id="msjAlert" class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Usuario eliminado con exito!</div>';

            loadUser();
            deleteUser();
        } else {
            loadUser();
        }
    });
}

//Funcion que muestra el modal con los datos de editar usuario
function modalEditUser() {
    $(".editUser").click(function() {
        var dniUser = $(this).attr("id");
        var user = JSON.parse(localStorage.getItem('users'));

        for (var i = 0; i < user.length; i++) {
            if (user[i].dniUser == dniUser) {
                var inputUser = '<div class="col-lg-6">'
                inputUser += '<div class="input-group"><span class="input-group-addon">DNI</span><input value="' + user[i].dniUser + '" type="text" class="form-control" id="dniUser"></div><br>';
                inputUser += '<div class="input-group"><span class="input-group-addon">Name</span><input value="' + user[i].nameUser + '" type="text" class="form-control" id="nameUser"></div><br>';
                inputUser += '<div class="input-group"><span class="input-group-addon">First Name</span><input value="' + user[i].firstNameUser + '" type="text" class="form-control" id="firstNameUser"></div><br>';
                inputUser += '<div class="input-group"><span class="input-group-addon">Last Name</span><input value="' + user[i].lastNameUser + '" type="text" class="form-control" id="lastNameUser"></div><br>';
                inputUser += '</div><div class="input-group"><span class="input-group-addon">User</span><input value="' + user[i].user + '" type="text" class="form-control" id="userUser"></div><br>';
                inputUser += '<div class="input-group"><span class="input-group-addon">Paswword</span><input value="' + user[i].passwordUser + '" type="password" class="form-control" id="passwordUser"></div><br>';
                inputUser += '<div class="input-group"><span class="input-group-addon">Confirm Password</span><input value="' + user[i].passwordUser + '" type="password" class="form-control" placeholder="Password" id="confirmPasswordUser" onkeyup="confirmPassword()"></div><br>';
                inputUser += '<div class="input-group" id="inputRoleUser"><span class="input-group-addon">Role</span><input type="text" class="form-control" id="roleUser" readonly="readonly" value="' + user[i].roleUser + '"><div class="input-group-btn">';
                inputUser += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"id="btnDropDownRole"><span class="caret"></span></button><ul class="dropdown-menu dropdown-menu-right" role="menu" id="dropdownCarrerStudents"><li><a class="select" id="Administrador" href="#"> Administrador</a></li>';
                inputUser += '<li><a class="select" id="Director de Carreras" href="#"> Director de Carreras</a></li></ul></div></div><br>';
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

//Funcion sirve para comparar el usuario y la contraseña del login
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

//Funcion para comprar que las contraseñas que va agregar coincidan
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

//Funcion que selecciona el select de Role
function selectRole() {
    $(".select").click(function() {
        var reason = $(this).attr("id");
        $("#roleUser").val(reason);
    });
}

//********************************************STUDENT*********************************************************************

//Funcion para cargar los estudiantes
function loadStudents() {
    var students = JSON.parse(localStorage.getItem('students'));
    var inputStudent = "<tr>";
    inputStudent += "<th>Image</th><th>DNI</th><th>Name</th><th>First Name</th><th>Last Name</th><th>Carrer</th><th>English</th>";
    inputStudent += '<th><a href="agregarEstudiante.html" type="button" class="btn btn-default " id="btnAddNewStudents"><span class="glyphicon glyphicon-plus-sign"></span></a></th></tr>';

    if (students != null) {
        for (var i = 0; i < students.length; i++) {
            if (students[i] != undefined) {
                inputStudent += '<tr><td style="width:12%;"> <img src="' + "imagenes/" + students[i].imageStudent + '" style="width:69%;" ></td>';
                inputStudent += '<td style="width:12%;">' + students[i].dniStudent + '</td><td>' + students[i].nameStudent + '</td>';
                inputStudent += '<td style="width:12%;">' + students[i].firstNameStudent + '</td><td>' + students[i].lastNameStudent + '</td>';
                inputStudent += '<td style="width:12%;">' + students[i].carrerStudent + '</td><td>' + students[i].enghlishStudent + '</td>';
                inputStudent += '<td style="width:12%;"><a type="button" class="btn btn-default editStudent" id="' + students[i].dniStudent + '"><span class="glyphicon glyphicon-edit"></span></a>';
                inputStudent += '<a  type="button" class="btn btn-default deleteStudent" id="' + students[i].dniStudent + '"><span class="glyphicon glyphicon-minus-sign"></span></a></td>';
                inputStudent += '</tr>';
            }
        }

    }
    document.getElementById('tableStudent').innerHTML = inputStudent;

    deleteStudents();
    modalEditStudent();
}
//Funcion para comparar si los espacios estan vacios
function inputStudentEmpty() {
    var isEmpty = false;
    var imageStudent = document.getElementById('file-1').files[0].name;
    var nameStudent = document.getElementById('nameStudent').value;
    var dniStudent = document.getElementById('dniStudent').value;
    var firstNameStudent = document.getElementById('firstNameStudent').value;
    var lastNameStudent = document.getElementById('lastNameStudent').value;
    var carrerStudent = document.getElementById('carrerStudent').value;
    var enghlishStudent = document.getElementById('enghlishStudent').value;

    if (imageStudent.length <= 0 || nameStudent.length <= 0 || dniStudent.length <= 0 || firstNameStudent.length <= 0 || lastNameStudent.length <= 0 || carrerStudent.length <= 0 || enghlishStudent.length <= 0) {
        isEmpty = true;
    }

    return isEmpty;
}

//Funcion para salvar los estudiantes en localstorage
function saveStudent() {
    var students = [];
    var condition = false;
    var imageStudent = document.getElementById('file-1').files[0].name;
    var nameStudent = document.getElementById('nameStudent').value;
    var dniStudent = document.getElementById('dniStudent').value;
    var firstNameStudent = document.getElementById('firstNameStudent').value;
    var lastNameStudent = document.getElementById('lastNameStudent').value;
    var carrerStudent = document.getElementById('carrerStudent').value;
    var enghlishStudent = document.getElementById('enghlishStudent').value;
    var inputEmpty = inputStudentEmpty();
    if (inputEmpty != true) {
        var arrayStudent = {
            "imageStudent": imageStudent,
            "dniStudent": dniStudent,
            "nameStudent": nameStudent,
            "firstNameStudent": firstNameStudent,
            "lastNameStudent": lastNameStudent,
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
            $("#formAddStudent").submit();
            students.push(arrayStudent);
            localStorage.setItem('students', JSON.stringify(students));
            var addAnotherEstudent = confirm("Want to add another Student?");
            if (addAnotherEstudent == true) {
                setTimeout("location.href='agregarEstudiante.html'", 0);
            } else {
                setTimeout("location.href='admin.html'", 0);
            }

        }
    } else {
        alert("You must fill all spaces");
    }
}

//Funcion para editar estudiantes
function editStudent(dniStudentEdit) {
    var students = [];
    var imageStudent = document.getElementById('file-1').files[0].name;
    var nameStudent = document.getElementById('nameStudent').value;
    var dniStudent = document.getElementById('dniStudent').value;
    var firstNameStudent = document.getElementById('firstNameStudent').value;
    var lastNameStudent = document.getElementById('lastNameStudent').value;
    var carrerStudent = document.getElementById('carrerStudent').value;
    var enghlishStudent = document.getElementById('enghlishStudent').value;
    var inputEmpty = inputStudentEmpty();
    if (inputEmpty != true) {
        var arrayStudent = {
            "imageStudent": imageStudent,
            "dniStudent": dniStudent,
            "nameStudent": nameStudent,
            "firstNameStudent": firstNameStudent,
            "lastNameStudent": lastNameStudent,
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
    } else {
        alert("You must fill all spaces");
    }
}

//Funcion para eliminar estudiantes
function deleteStudents() {
    $(".deleteStudent").click(function() {
        var dniStudent = $(this).attr("id");
        var arrayStudents = [];
        var studentLocalStorage = {};
        var stundents = JSON.parse(localStorage.getItem('students'));
        var comparestundents;

        var deleteStudent = confirm("are you sure you want to delete this student?");
        if (deleteStudent == true) {
            for (var i = 0; i < stundents.length; i++) {

                if (stundents[i] != undefined) {
                    comparestundents = stundents[i].dniStudent;
                    if (comparestundents == dniStudent) {
                        delete stundents[i];
                        break;
                    }
                }
            }
            for (var i = 0; i < stundents.length; i++) {
                if (stundents[i] != undefined) {
                    studentLocalStorage = {
                        "imageStudent": stundents[i].imageStudent,
                        "dniStudent": stundents[i].dniStudent,
                        "nameStudent": stundents[i].nameStudent,
                        "firstNameStudent": stundents[i].firstNameStudent,
                        "lastNameStudent": stundents[i].lastNameStudent,
                        "carrerStudent": stundents[i].carrerStudent,
                        "enghlishStudent": stundents[i].enghlishStudent
                    };
                    arrayStudents.push(studentLocalStorage);
                }
            }
            localStorage.setItem('students', JSON.stringify(arrayStudents));
            // document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Estudiante eliminado con exito!</div>';

            loadStudents();
            deleteStudents();
        } else {
            loadStudents();
        }
    });
}

//Funcion que muestra el modal con los datos de editar estudiante
function modalEditStudent() {
    $(".editStudent").click(function() {
        var dniStudent = $(this).attr("id");
        var student = JSON.parse(localStorage.getItem('students'));

        for (var i = 0; i < student.length; i++) {
            if (student[i].dniStudent == dniStudent) {
                var image = student[i].imageStudent;
                var inputStudent = '<div class="col-lg-12"><div class="form-group"><input id="file-1" type="file" class="file" ></div></div><br>';
                inputStudent += '<div class="col-lg-6"><div class="input-group"><span class="input-group-addon">DNI</span><input value="' + student[i].dniStudent + '" type="text" class="form-control" id="dniStudent"></div><br>';
                inputStudent += '<div class="input-group"><span class="input-group-addon">Name</span><input value="' + student[i].nameStudent + '" type="text" class="form-control" id="nameStudent"></div><br>';
                inputStudent += '<div class="input-group"><span class="input-group-addon">Fist Name</span><input value="' + student[i].firstNameStudent + '" type="text" class="form-control" id="firstNameStudent"></div><br>';
                inputStudent += '</div><div class="input-group"><span class="input-group-addon">Last Name</span><input value="' + student[i].lastNameStudent + '" type="text" class="form-control" id="lastNameStudent"></div><br>';
                inputStudent += '<div class="input-group"><span class="input-group-addon">Carrer</span><input type="text" class="form-control" id="carrerStudent" readonly="readonly" value="' + student[i].carrerStudent + '">';
                inputStudent += '<div class="input-group-btn"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"id="btnDropDownCarrer"><span class="caret"></span></button>';
                inputStudent += '<ul class="dropdown-menu dropdown-menu-right" role="menu" id="dropdownCarrerStudents"></ul></div></div><br>';
                inputStudent += '<div class="input-group"><span class="input-group-addon">English</span><input value="' + student[i].enghlishStudent + '" type="text" class="form-control" id="enghlishStudent"></div><br>';

            }
        }

        document.getElementById('myModalBodyEdit').innerHTML = inputStudent;

        $("#file-1").fileinput({
            initialPreview: [
                "<img src='" + "imagenes/" + image + "' class='file-preview-image'>",
            ],
            overwriteInitial: true,
            initialCaption: image,
        });
        loadDropDown();
        $("#btnEdit").click(function() {
            editStudent(dniStudent);
        });
        $("#myModal-Admin").modal("show");


    });
}

//Funcion que selecciona la carrera en un select
function selectCarrer() {
    $(".select").click(function() {
        var reason = $(this).attr("id");
        $("#carrerStudent").val(reason);
    });
}

//Funcion para llenar el DropDown con los datos de la carrera
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

//Funcion para cargar carrera
function loadCarrer() {
    var carrers = JSON.parse(localStorage.getItem('carrers'));
    var inputCarrer = "<tr>";
    inputCarrer += "<th>code</th><th>Name</th>";
    inputCarrer += '<th><a href="agregarCarrera.html" type="button" class="btn btn-default " id="btnAddNewCarrer"><span class="glyphicon glyphicon-plus-sign"></span></a></th></tr>';

    if (carrers != null) {
        for (var i = 0; i < carrers.length; i++) {
            if (carrers[i] != undefined) {
                inputCarrer += '<tr><td>' + carrers[i].codeCarrer + '</td>';
                inputCarrer += '<td>' + carrers[i].nameCarrer + '</td>';
                inputCarrer += '<td><a type="button" class="btn btn-default editCarrer" id="' + carrers[i].nameCarrer + '"><span class="glyphicon glyphicon-edit"></span></a>';
                inputCarrer += '<a "type="button" class="btn btn-default deleteCarrer" id="' + carrers[i].nameCarrer + '"><span class="glyphicon glyphicon-minus-sign"></span></a></td>';
                inputCarrer += '</tr>';
            }
        }
    }
    document.getElementById('tableCarrer').innerHTML = inputCarrer;
    deleteCarrer();
    modalEditCarrer();
}

//Funcion para comparar si los espacios estan vacios
function inputCarrerEmpty() {
    var isEmpty = false;
    var codeCarrer = document.getElementById('codeCarrer').value;
    var nameCarrer = document.getElementById('nameCarrer').value;

    if (codeCarrer.length <= 0 || nameCarrer.length <= 0) {
        isEmpty = true;
    }

    return isEmpty;
}

//Funcion para salvar carrera en localstorage
function saveCarrer() {
    var carrers = [];
    var condition = false;
    var codeCarrer = document.getElementById('codeCarrer').value;
    var nameCarrer = document.getElementById('nameCarrer').value;
    var inputEmpty = inputCarrerEmpty();
    if (inputEmpty != true) {
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
        var addAnotherCarrer = confirm("Want to add another Carrer?");
        if (addAnotherCarrer == true) {
            setTimeout("location.href='agregarCarrera.html'", 0);
        } else {
            setTimeout("location.href='admin.html'", 0);
        }
    } else {
        alert("You must fill all spaces");
    }
}

//Funcion para editar carrera
function editCarrer(nameCarrerEdit) {
    var carrers = [];
    var condition = false;
    var codeCarrer = document.getElementById('codeCarrer').value;
    var nameCarrer = document.getElementById('nameCarrer').value;
    var inputEmpty = inputCarrerEmpty();
    if (inputEmpty != true) {
        var arrayCarrer = {
            "codeCarrer": codeCarrer,
            "nameCarrer": nameCarrer
        };

        var carrers = JSON.parse(localStorage.getItem('carrers'));

        for (var i = 0; i < carrers.length; i++) {

            if (carrers[i].nameCarrer == nameCarrerEdit) {
                carrers[i] = arrayCarrer;
                localStorage.setItem('carrers', JSON.stringify(carrers));
            }
        }

        $("#myModal-Admin").modal("hide");
        loadCarrer();
    } else {
        alert("You must fill all spaces");
    }
}

//Funcion para eliminar carrera
function deleteCarrer() {
    $(".deleteCarrer").click(function() {
        var nameCarrer = $(this).attr("id");
        var arrayCarrer = [];
        var carrerLocalStorage = {};
        var carrer = JSON.parse(localStorage.getItem('carrers'));
        var compareCarrer;

        var deleteCarrer = confirm("are you sure you want to delete this carrer?");
        if (deleteCarrer == true) {
            for (var i = 0; i < carrer.length; i++) {

                if (carrer[i] != undefined) {
                    compareCarrer = carrer[i].nameCarrer;
                    if (compareCarrer == nameCarrer) {
                        delete carrer[i];
                        break;
                    }
                }
            }
            for (var i = 0; i < carrer.length; i++) {
                if (carrer[i] != undefined) {
                    carrerLocalStorage = {
                        "codeCarrer": carrer[i].codeCarrer,
                        "nameCarrer": carrer[i].nameCarrer
                    };
                    arrayCarrer.push(carrerLocalStorage);
                }
            }
            localStorage.setItem('carrers', JSON.stringify(arrayCarrer));
            //document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Carrera eliminada con exito!</div>';

            loadCarrer();
            deleteCarrer();
        } else {
            loadCarrer();
        }

    });
}

//Funcion que muestra el modal con los datos de editar carrera
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
