document.querySelectorAll(".btn-sta").forEach(function (button) {
  button.addEventListener("click", function () {
    // Cambia texto y estilo del botón
    this.textContent = "Completado";
    this.classList.add("btn--completed");

    // Encuentra el estado en la misma fila
    const row = this.closest("tr");
    const estado = row.querySelector(".status");

    estado.textContent = "Completado";
    estado.classList.remove("status--pending");
    estado.classList.add("status--completed");
  });
});

async function mostrarPedidosPendientes() {
  try {
    const response = await fetch('http://localhost:3000/getOrders');
    const productos = await response.json();
    const contenedor = document.getElementById('tablaPedidos');
    contenedor.innerHTML = ''; // Limpiar tabla

    productos.forEach(producto => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${producto.id_Pedido}</td>
        <td>${producto.Cliente}</td>
        <td>${producto.Bebida}</td>
        <td>${producto.Tamaño}</td>
        <td>${producto.Extras}</td>
        <td class="status status--pending">${producto.Estado}</td>
        <td><button class="btn btn--primary btn--small btn-sta" id="${producto.id_Pedido}">Completar</button></td>
      `;
      contenedor.appendChild(fila);
    });

    // Reasignar evento a los botones
    document.querySelectorAll(".btn-sta").forEach(function (button) {
      button.addEventListener("click", function () {

        if (this.textContent === 'Completar') {
          this.textContent = "Cancelar";
          this.classList.add("btn--completed");

          const row = this.closest("tr");
          const estado = row.querySelector(".status");
          estado.textContent = "Completado";
          estado.classList.remove("status--pending");
          estado.classList.add("status--completed");

          changeStatus('1', this.id);
          setTimeout(function () {
            mostrarPedidosPendientes();
            //window.location.reload();
          }, 10000);
        } else {
          this.textContent = "Completar";
          this.classList.remove("btn--completed");

          const row = this.closest("tr");
          const estado = row.querySelector(".status");
          estado.textContent = "En espera";
          estado.classList.remove("status--completed");
          estado.classList.add("status--pending");

          changeStatus('0', this.id);
        }
      });
    });

  } catch (error) {
    console.error('Error al mostrar pedidos:', error);
  }
}

// Llamar función automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', mostrarPedidosPendientes);


function changeStatus(st, id) {
  if (id && st) {
    console.log(st, id)
    fetch('http://localhost:3000/changeSt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ st, id })
    });
  } else {
    console.log('no hay datos');
  }
}