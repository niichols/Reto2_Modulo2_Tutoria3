//Java Script para el htm index.html

// PAGINA PARA REGEX DEL EMAIL: https://www.w3resource.com/javascript/form/email-validation.php#:~:text=To%20get%20a%20valid%20email,%5D%2B)*%24%2F.
// constantes de email y name
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//Variales boolean para validar los datos de crearCuenta.html
let isValidEmail = false;
let isValidPassword = false;

//Llamar el formulario con id sigupForm
let form = document.getElementById('loginForm');

//Funcion listener para cada vez que se realicen cambios en los input
form.addEventListener('input', function (event){
    const formData = new FormData(form);
    const email = formData.get('inputEmail');
    const password = formData.get('inputPassword');

    isValidEmail = emailFormat.test(email);
    isValidPassword = password.length >= 6;

    //Validar si es valido o es invalido el campo nombre
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
});

//Funcion listener 2 para evento de que se suban los datos.
form.addEventListener('submit', function (event){
    let email = document.getElementById('inputEmail').value;

    if (!form.checkValidity()  || !isValidEmail || !isValidPassword){

        event.preventDefault();
        event.stopPropagation();
    }else {
        const email = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;

        $.ajax({
            url: 'http://localhost:8080/api/user/'+email+'/'+password,
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (response){
                sessionStorage.setItem('username', response.name);
                console.log(response);
            },
            error: function (){
                alert("Error al autenticar usuario.");
            }
        })
    }
});