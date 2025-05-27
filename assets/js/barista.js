document.querySelectorAll(".btn-sta").forEach(function(button) {
    button.addEventListener("click", function() {
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
    const response = await fetch('http://localhost:3000/getPedido');
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
        <td><button class="btn-sta">✔️ Listo</button></td>
      `;
      contenedor.appendChild(fila);
    });

    // Reasignar evento a los botones
    document.querySelectorAll(".btn-sta").forEach(function(button) {
      button.addEventListener("click", function() {
        this.textContent = "Completado";
        this.classList.add("btn--completed");

        const row = this.closest("tr");
        const estado = row.querySelector(".status");
        estado.textContent = "Completado";
        estado.classList.remove("status--pending");
        estado.classList.add("status--completed");
      });
    });

  } catch (error) {
    console.error('Error al mostrar pedidos:', error);
  }
}

// Llamar función automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', mostrarPedidosPendientes);
