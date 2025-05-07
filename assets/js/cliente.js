const cadenaBusqueda = document.getElementById('searchString');
const btnBusqueda = document.getElementById('btn_search');
const nombreUsuario = document.getElementById('inp_nombre').value;
const emailUsuario = document.getElementById('inp_email').value;
const btnGuardar = document.getElementById('btn_guardar');

cadenaBusqueda.addEventListener('change', async function() {
    let nombre = cadenaBusqueda.value;

    console.log(nombre);
    try {
        const response = await fetch('http://localhost:3000/clients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Error en el login');


        console.log(data);

    } catch (error) {
        alert(error.message);
    }
});