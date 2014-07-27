	

function addClick(){
	$( "#btnLogin" ).click(function() { compareUser() ;});
	$( "#btnAddStudent" ).click(function() { saveStudent() ;});
	$( "#btnAddCarrer" ).click(function() { saveCarrer() ;});
	$( "#btnAddUser" ).click(function() { saveUser() ;});

}

function compareUser(){
	var arrayUser = [];
	var user = document.getElementById('userLogin').value;
	var password = document.getElementById('passwordLogin').value;
	var dataUser = JSON.parse(localStorage.getItem('user'));
	
	arrayUser.push(dataUser);

	for (var i = 0; i < arrayUser.length; i++) {
		if(arrayUser[i].user == user && arrayUser[i].password == password){
			window.location="admin.html";
			//location.href = "admin.html";
			// header("Location: admin.html "); 
			

		}
	}
}

function saveStudent(){
	var nameStudent = document.getElementById('nameStudent').value;
	var dniStudent = document.getElementById('dniStudent').value;
	var carrerStudent = document.getElementById('carrerStudent').value;
	var enghlishStudent = document.getElementById('enghlishStudent').value;

	var arrayStudent = {"dniStudent": dniStudent, nameStudent: nameStudent, "carrerStudent": carrerStudent, "enghlishStudent": enghlishStudent};

	var students = JSON.parse(localStorage.getItem('students'));
    if (students === null) {
        students = [];
    }

    // agregar el estudiante
    students.push(arrayStudent);
	localStorage.setItem('students', JSON.stringify(students));
	
}

function saveUser(){
	var	idUser = document.getElementById('idUser').value;
	var nameUser = document.getElementById('nameUser').value;
	var	firstNameUser = document.getElementById('firstNameUser').value;
	var lastNameUser = document.getElementById('lastNameUser').value;
	var dniUser = document.getElementById('dniUser').value;
	var	user = document.getElementById('user').value;
	var passwordUser = document.getElementById('passwordUser').value;
	var roleUser = document.getElementById('roleUser').value;

	var arrayUser = {"idUser": idUser, "nameUser": nameUser, "firstNameUser": firstNameUser, "lastNameUser": lastNameUser, "dniUser": dniUser, "user": user, "passwordUser": passwordUser, "roleUser": roleUser};

	var users = JSON.parse(localStorage.getItem('user'));
	if(users === null){
		users = [];
	}

	users.push(arrayUser);
	localStorage.setItem('user', JSON.stringify(users));
}

function saveCarrer(){
	var	codeCarrer = document.getElementById('codeCarrer').value;
	var nameCarrer = document.getElementById('nameCarrer').value;

	var arrayCarrer = {"codeCarrer": codeCarrer, "nameCarrer": nameCarrer};

	var carrers = JSON.parse(localStorage.getItem('carrer'));
	if(carrers === null){
		carrers = [];
	}

	carrers.push(arrayCarrer);
	localStorage.setItem('carrer', JSON.stringify(carrers));
}

function loadCarrer(){
	var carrers = JSON.parse(localStorage.getItem('carrer'));
	var inputCarrer = "<tr>";
	inputCarrer += "<th>code</th><th>Name</th><th>Option</th></tr>";
	for (var i = 0; i < carrers.length; i++) {
		
		inputCarrer += '<tr><td>' + carrers[i].codeCarrer + '</td>';
		inputCarrer += '<td>' + carrers[i].nameCarrer + '</td>';
		inputCarrer += '<td><a type="button" class="btn btn-default"><span class="glyphicon glyphicon-edit"></span></a>';
		inputCarrer += '<a type="button" class="btn btn-default"><span class="glyphicon glyphicon-minus-sign"></span></a></td>';
		inputCarrer += '</tr>';
	}
		document.getElementById('tableCarrer').innerHTML = inputCarrer;


}

function loadStudents(){
	var students = JSON.parse(localStorage.getItem('students'));
	var inputStudent = "<tr>";
	inputStudent += "<th>Name</th><th>DNI</th><th>Carrer</th><th>English</th></tr>";
	for (var i = 0; i < students.length; i++) {
		
		inputStudent += '<tr><td>' + students[i].nameStudent + '</td><td>' + students[i].dniStudent + '</td>';
		inputStudent += '<td>' + students[i].carrerStudent + '</td><td>' + students[i].enghlishStudent + '</td>';
		inputStudent += '<td><a type="button" class="btn btn-default"><span class="glyphicon glyphicon-edit"></span></a>';
		inputStudent += '<a type="button" class="btn btn-default"><span class="glyphicon glyphicon-minus-sign"></span></a></td>';
		inputStudent += '</tr>';
		
		}
		document.getElementById('tableStudent').innerHTML = inputStudent;


}

function loadUser(){
	var users = JSON.parse(localStorage.getItem('user'));
	var inputUser = "<tr>";
	inputUser += "<th>ID</th><th>Name</th><th>First Name</th><th>Last Name</th>";
	inputUser += "<th>DNI</th><th>User</th><th>Paswword</th><th>Role</th></tr>";
	
	for (var i = 0; i < users.length; i++) {
		inputUser += '<tr><td>' + users[i].idUser + '</td><td>' + users[i].nameUser + '</td>';
		inputUser += '<td>' + users[i].firstNameUser + '</td><td>' + users[i].lastNameUser + '</td>';
		inputUser += '<td>' + users[i].dniUser + '</td><td>' + users[i].user + '</td>';
		inputUser += '<td>' + users[i].passwordUser + '</td><td>' + users[i].roleUser + '</td>';
		inputUser += '<td><a type="button" class="btn btn-default"><span class="glyphicon glyphicon-edit"></span></a>';
		inputUser += '<a type="button" class="btn btn-default"><span class="glyphicon glyphicon-minus-sign"></span></a></td>';
		inputUser += '</tr>';
		
		}
		document.getElementById('tableUser').innerHTML = inputUser;


}

	