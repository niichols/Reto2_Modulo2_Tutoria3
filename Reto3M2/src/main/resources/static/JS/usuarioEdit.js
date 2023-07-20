const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const nameLetters = /^[A-Za-z ]+$/;

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

const userOriginal = JSON.parse(sessionStorage.getItem('datosUserEdit'));
if (userOriginal == null || userOriginal ==='' || userOriginal === 'null'){
    document.getElementById('content').innerHTML= "<h3 class='fw-bold'>Algo salio mal</h3><br><button class='btn btn-warning' onclick='location.href=\"index.html\"'>Volver</button>"
}
document.getElementById('inputId').value = userOriginal.id;
    document.getElementById('inputIdentification').value = userOriginal.identification;
    document.getElementById('inputName').value = userOriginal.name;
    document.getElementById('inputAddress').value = userOriginal.address;
    document.getElementById('inputCellphone').value = userOriginal.cellPhone;
    document.getElementById('inputEmail').value = userOriginal.email;
    document.getElementById('inputPassword').value = userOriginal.password;
    document.getElementById('inputConfirmPassword').value = userOriginal.password;
    document.getElementById('inputZone').value = userOriginal.zone;
    document.getElementById('inputType').value = userOriginal.type;


//Funtion llamado ajax para validar si el correo existe
function emailExists(email){
    if (userOriginal.email !==email){
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
}else {
        return false;
    }
}

//Funcion listener para cada vez que se realicen cambios en los input
form.addEventListener('input', function (event){
    const formData = new FormData(form);
    const identification = formData.get('inputIdentification');
    const name = formData.get('inputName');
    const address = formData.get('inputAddress');
    const cellPhone = formData.get('inputCellphone');
    const email = formData.get('inputEmail');
    const password = formData.get('inputPassword');
    const confirmPassword = formData.get('inputConfirmPassword');
    const zone = formData.get('inputZone');
    const type = formData.get('inputType');

    isValidIdentification = identification.length > 1;
    isValidName = nameLetters.test(name);
    isValidAddress = address.length > 0;
    isValidCellPhone = cellPhone.length === 10;
    isValidEmail = emailFormat.test(email);
    isValidPassword = password.length >= 6;
    matchingPassword = password === confirmPassword && confirmPassword !== '';
    isValidZone = zone.length > 1;
    isValidType = type === 'COORD' || type === 'ASE' || (type === 'ADM' && userOriginal == 'ADM');

    //Validar si es valido o es invalido el campo nombre
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
            url: 'http://localhost:8080/api/user/update',
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            data: JSON.stringify(datos),
            success: function (response){
                alert("Exito al actualizar usuario");
            },
            error: function (){
                alert("Error de peticion al actualizar usuario.");
            }
        })
    }
});
