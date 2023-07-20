
//Variales boolean para validar los datos de crearCuenta.html
let matchingPassword = false;
let isValidEmail = false;
let isValidPassword = false;
let isValidName = false;
let isValidId = false;
let isValidIdentification = false;
let isValidAddress = false;
let isValidCellPhone = false;
let isValidZone = false;
let isValidType = false;

//Llamar el formulario con id sigupForm
let form = document.getElementById('singUpForm');

//Funtion llamado ajax para validar si el correo existe
function emailExists(email){
    let isValid = false;
    $.ajax({
        url: 'http://localhost:8080/api/user/emailexist/'+email,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response){
            isValid = Boolean(response)
            alert("Usuario no existe se va guardar");
        },
        error: function (){
            alert("ERROR - No se pudo crea el usuario valide los datos");
        }
    });
    return isValid;
}

//Funcion listener para cada vez que se realicen cambios en los input
form.addEventListener('input', function (event){
    const formData = new FormData(form);
    const id = formData.get('inputId');
    const identification = formData.get('inputIdentification');
    const name = formData.get('inputName');
    const address = formData.get('inputAddress');
    const cellPhone = formData.get('inputCellphone');
    const email = formData.get('inputEmail');
    const password = formData.get('inputPassword');
    const confirmPassword = formData.get('inputConfirmPassword');
    const zone = formData.get('inputZone');
    const type = formData.get('inputType');

    isValidId = id.length > 0;
    isValidIdentification = identification.length > 1;
    isValidName = nameLetters.test(name);
    isValidAddress = address.length > 0;
    isValidCellPhone = cellPhone.length === 10;
    isValidEmail = emailFormat.test(email);
    isValidPassword = password.length >= 6;
    matchingPassword = password === confirmPassword && confirmPassword !== '';
    isValidZone = zone.length > 1;
    isValidType = type === 'COORD' || type === 'ASE';

    //Validar si es valido o es invalido el campo nombre
    if(isValidId){
        document.getElementById('inputId').classList.remove('is-invalid');
        document.getElementById('inputId').classList.add('is-valid');
    }else {
        document.getElementById('inputId').classList.add('is-invalid');
        document.getElementById('inputId').classList.remove('is-valid');
    }
    if(isValidIdentification){
        document.getElementById('inputIdentification').classList.remove('is-invalid');
        document.getElementById('inputIdentification').classList.add('is-valid');
    }else {
        document.getElementById('inputIdentification').classList.add('is-invalid');
        document.getElementById('inputIdentification').classList.remove('is-valid');
    }
    if(isValidName){
        document.getElementById('inputName').classList.remove('is-invalid');
        document.getElementById('inputName').classList.add('is-valid');
    }else {
        document.getElementById('inputName').classList.add('is-invalid');
        document.getElementById('inputName').classList.remove('is-valid');
    }
    if(isValidAddress){
        document.getElementById('inputAddress').classList.remove('is-invalid');
        document.getElementById('inputAddress').classList.add('is-valid');
    }else {
        document.getElementById('inputAddress').classList.add('is-invalid');
        document.getElementById('inputAddress').classList.remove('is-valid');
    }
    if(isValidCellPhone){
        document.getElementById('inputCellphone').classList.remove('is-invalid');
        document.getElementById('inputCellphone').classList.add('is-valid');
    }else {
        document.getElementById('inputCellphone').classList.add('is-invalid');
        document.getElementById('inputCellphone').classList.remove('is-valid');
    }
    if(isValidEmail){
        document.getElementById('inputEmail').classList.remove('is-invalid');
        document.getElementById('inputEmail').classList.add('is-valid');
    }else {
        document.getElementById('inputEmail').classList.add('is-invalid');
        document.getElementById('inputEmail').classList.remove('is-valid');
        document.getElementById('emailErrorMsg').innerText = 'Ingresa un email valido';
    }
    if(isValidPassword){
        document.getElementById('inputPassword').classList.remove('is-invalid');
        document.getElementById('inputPassword').classList.add('is-valid');
    }else {
        document.getElementById('inputPassword').classList.add('is-invalid');
        document.getElementById('inputPassword').classList.remove('is-valid');
    }
    if(matchingPassword){
        document.getElementById('inputConfirmPassword').classList.remove('is-invalid');
        document.getElementById('inputConfirmPassword').classList.add('is-valid');
    }else {
        document.getElementById('inputConfirmPassword').classList.add('is-invalid');
        document.getElementById('inputConfirmPassword').classList.remove('is-valid');
    }
    if(isValidZone){
        document.getElementById('inputZone').classList.remove('is-invalid');
        document.getElementById('inputZone').classList.add('is-valid');
    }else {
        document.getElementById('inputZone').classList.add('is-invalid');
        document.getElementById('inputZone').classList.remove('is-valid');
    }
    if(isValidType){
        document.getElementById('inputType').classList.remove('is-invalid');
        document.getElementById('inputType').classList.add('is-valid');
    }else {
        document.getElementById('inputType').classList.add('is-invalid');
        document.getElementById('inputType').classList.remove('is-valid');
    }
});

//Funcion listener 2 para evento de que se suban los datos.
form.addEventListener('submit', function (event){
    let email = document.getElementById('inputEmail').value;

    if (!form.checkValidity() || !isValidName || !isValidEmail || !isValidPassword || !matchingPassword || emailExists(email)){
        if(isValidEmail && emailExists(email)){
            document.getElementById('inputEmail').classList.add('is-invalid');
            document.getElementById('inputEmail').classList.remove('is-valid');
            document.getElementById('emailErrorMsg').innerText = 'Este email ya esta creado';
        }
        event.preventDefault();
        event.stopPropagation();
    }else {

        let datos = {
            'id' : document.getElementById('inputId').value,
            'identification' : document.getElementById('inputIdentification').value,
            'name': document.getElementById('inputName').value,
            'address': document.getElementById('inputAddress').value,
            'cellPhone': document.getElementById('inputCellphone').value,
            'email': document.getElementById('inputEmail').value,
            'password': document.getElementById('inputPassword').value,
            'zone': document.getElementById('inputZone').value,
            'type': document.getElementById('inputType').value
        }

        $.ajax({
            url: 'http://localhost:8080/api/user/new',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            data: JSON.stringify(datos),
            success: function (response){
                alert("Exito al guardar usuario");
            },
            error: function (){
                alert("Error de peticion al agregar usuario.");
            }
        })
    }
});



// JS de ver Usuarios
let name = sessionStorage.getItem('username');

if (name === 'null'){
    document.getElementById('userGreeting').innerText = "No existe el usuario";
}else if(name!=null){
    document.getElementById('userGreeting').innerText = "Bienvenid@"+name;

    $.ajax({
        url: 'http://localhost:8080/api/user/all',
        type: 'GET',
        dataType: 'json',
        success: function (response){
            pintarDatos(response);
        },
        error: function (){
            console.log("Error de peticion al listar usuaios")
        }
    })
}
function pintarDatos(datos){
    let insertar = '';

    insertar += '<thead><tr><th>ID</th><th>Identifiacion</th><th>Nombre</th><th>Direccion</th><th>Celular</th><th>Correo</th><th>Contraseña</th><th>Zona</th><th>Tipo</th><th></th><th></th></tr></thead><tbody>';
    datos.forEach(dato => {
        insertar += '<tr>';
        Object.values(dato).forEach(valor =>{
            insertar += '<td>'+valor+'</td>';
        });
        let datosEditar = JSON.stringify(dato);
        insertar += '<td><button class="btn btn-danger" onclick="eliminarRegistro('+dato.id+')">X</button>'
        insertar += "<td><button class='btn btn-warning' onclick='editarRedirect("+datosEditar+");'>Editar</button>";
        insertar += '</tr>'
    });
    document.getElementById('userTable').innerHTML = insertar;
}

function eliminarRegistro(id){
    $.ajax({
        url: "http://localhost:8080/api/user/"+id,
        type: 'DELETE',
        dataType: 'json',
        success: function (response){
            location.reload();
        },
        error: function (){
            console.log("Error de peticion al Eliminar usuaios")
        }
    })
}

function editarRedirect(datos){
    sessionStorage.setItem('datosUserEdit', JSON.stringify(datos));
    location.href = "../usuarioEdit.html";
}