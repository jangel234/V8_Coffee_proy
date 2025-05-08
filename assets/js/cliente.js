const cadenaBusqueda = document.getElementById('searchString');
const btnBusqueda = document.getElementById('btn_search');
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
        data => {data.forEach(cliente => {
                let elementoLista = document.createElement('li');
                let nombre = document.createElement('a');
                nombre.textContent = cliente.nombre;
                nombre.href = './V8_Coffe_proy/assets/html/menu.html';
                elementoLista.appendChild(nombre);
                listaClientes.appendChild(elementoLista);
            });
        }
    } catch (error) {
        alert(error.message);
    }
});