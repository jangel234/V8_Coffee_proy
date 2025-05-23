const cadenaBusqueda = document.getElementById('searchString');
const btnGuardar = document.getElementById('btn_guardar');
const listaClientes = document.getElementById('lista_clientes');
const newclient = document.getElementById('newClient');

//Busqueda
cadenaBusqueda.addEventListener('input', async function () {
    let nombre = cadenaBusqueda.value;
    
    try {
        const response = await fetch('http://localhost:3000/clients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Error en la búsqueda');


        console.log(data);

        // Limpiar la lista actual
        listaClientes.innerHTML = '';

        // Agregar cada cliente a la lista
        data.clients.forEach(cliente => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            li.style.listStyleType = 'none';
            a.textContent = `${cliente.nombre}`;
            a.href = './.././html/menu.html';
            

            a.addEventListener('click', function () {
                localStorage.setItem('clienteSeleccionado', cliente.nombre);
                localStorage.setItem('idSelectedClient', cliente.id);
            });

            li.appendChild(a);
            listaClientes.appendChild(li);
        });

    } catch (error) {
        //alert(error.message);
    }
});

//Añadir clientes
btnGuardar.addEventListener('click', async function () {

    const nombreUsuario = document.getElementById('inp_nombre').value;
    const telUsuario = document.getElementById('inp_tel').value;
    let nombre = nombreUsuario;
    let telefono = telUsuario;

    if (!nombre || !telefono) {
        alert('Todos los campos son necesarios');
        return;
    }

    if(telefono.length < 10){
        alert("El número telefonico debe ser de 10 dígitos");
        return;
    }

    try {
        //envio de usuario
        const response = await fetch('http://localhost:3000/newClient', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, telefono })
        });
        let res = await response.json();

        console.log(res);

        alert("Cliente agregado exitosamente");
    } catch (error) {
        //alert(error.message);
    }
    setTimeout(function () {
        let s = document.getElementById('form');
        s.reset();
        location.reload();
    }, 2000);
});

window.addEventListener('load', function () {
    document.getElementById('register').style.display = "none";
});

newclient.addEventListener('click', function () {
    document.getElementById('register').style.display = "block";
});



  document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href').split('/').pop();
      if (href === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });