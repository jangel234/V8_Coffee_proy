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
  
      // (Opcional) Desactivar el botón
      this.disabled = true;
    });
  });
  