const cadenaBusqueda = document.getElementById('searchString');
const nombreUsuario = document.getElementById('inp_nombre').value;
const emailUsuario = document.getElementById('inp_email').value;
const btnGuardar = document.getElementById('btn_guardar');
const listaClientes = document.getElementById('lista_clientes');

//Busqueda
cadenaBusqueda.addEventListener('input', async function() {
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

         //creacion de la lista de clientes

        // Limpiar la lista actual
        listaClientes.innerHTML = '';

        // Verificar que haya resultados
        if (data.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No se encontraron clientes.';
            listaClientes.appendChild(li);
            return;
        }

        // Agregar cada cliente a la lista
        data.clients.forEach(cliente => {
            const li = document.createElement('li');
            li.textContent = `${cliente.nombre}`;
            listaClientes.appendChild(li);
        });

    } catch (error) {
        //alert(error.message);
    }
});

//Añadir clientes
btnGuardar.addEventListener('click', function (){

});