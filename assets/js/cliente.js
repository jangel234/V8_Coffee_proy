const cadenaBusqueda = document.getElementById('searchString').value;
const btnBusqueda = document.getElementById('btn_search');
const nombreUsuario = document.getElementById('inp_nombre').value;
const emailUsuario = document.getElementById('inp_email').value;
const btnGuardar = document.getElementById('btn_guardar');

btnBusqueda.addEventListener('click', function() {
    if(!cadenaBusqueda) {
        console.log("yeiiiii");
    }
});