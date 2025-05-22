document.getElementById('continue').addEventListener('click', async () => {
  console.log('continuar');
  let producto = localStorage.getItem('idProd');
  let idCliente = localStorage.getItem('idSelectedClient');
  let idEmpleado = localStorage.getItem('idCajero');


  let pedido = localStorage.getItem('P');
  let extras = 'Extras aquí';

  if (!producto || !pedido || !extras) {
  console.error("Error: Datos faltantes en el pedido:");
  console.log("producto:", producto);
  console.log("pedido:", pedido);
  console.log("extras:", extras);
  alert("Error: No se pudo continuar. Faltan datos del producto, pedido o extras.");
  return;
}

  try {
    // Si ya existe un pedido
    if (pedido) {
      await fetch('http://localhost:3000/newPP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ producto, pedido, extras })
      });
    } else {
      // Crear nuevo pedido primero
      const res = await fetch('http://localhost:3000/newOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idCliente, idEmpleado })
      });

      const data = await res.json();
      pedido = data.pedidoId;

      localStorage.setItem('P', pedido);

      // Luego registrar PP
      await fetch('http://localhost:3000/newPP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ producto, pedido, extras })
      });
    }

    // Redirigir
    window.location.href = "./../html/pago.html";

  } catch (error) {
    console.error(error);
    alert("Hubo un problema al registrar el pedido.");
  }
})


document.getElementById('addOther').addEventListener('click', async () => {
  console.log('agrega otro');
  let producto = localStorage.getItem('idProd');
  let idCliente = localStorage.getItem('idSelectedClient');
  let idEmpleado = localStorage.getItem('idCajero');

  if (!producto || !idCliente || !idEmpleado) {
    alert('Error: Faltan datos del producto, cliente o cajero.');
    return;
  }

  let pedido = localStorage.getItem('P');
  let extras = 'Extras aquí';

  try {
    if (!pedido) {
      const res = await fetch('http://localhost:3000/newOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idCliente, idEmpleado })
      });

      const data = await res.json();
      pedido = data.pedidoId;
      localStorage.setItem('P', pedido);
    }

    await fetch('http://localhost:3000/newPP', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ producto, pedido, extras })
    });

    window.location.href = "./../html/menu.html";
  } catch (error) {
    console.error(error);
    alert("Error al añadir producto al pedido.");
  }
});