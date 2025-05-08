
  document.addEventListener('DOMContentLoaded', () => {
    const btnCalientes = document.getElementById('btnCalientes');
    const btnFrias = document.getElementById('btnFrias');
    const grid = document.getElementById('gridBebidas');
  
    // Función para cargar bebidas 
    const cargarBebidas = async (nombre) => {
      try {
        const response = await fetch(`http://localhost:3000/products`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
  
        grid.innerHTML = ''; 
  
        data.forEach(producto => {
          const card = document.createElement('article');
          card.classList.add('card');
          card.setAttribute('data-tipo', producto.tipo);
          card.innerHTML = `
            <div class="card-content">
              <h3>${producto.nombre}</h3>
              <a href="extras.html?drink=${encodeURIComponent(producto.nombre)}" class="btn-seleccionar">Seleccionar</a>
            </div>
          `;
          grid.appendChild(card);
        });
      } catch (err) {
        console.error('Error cargando bebidas:', err);
      }
    };
  
    btnCalientes.addEventListener('click', () => cargarBebidas('caliente'));
    btnFrias.addEventListener('click', () => cargarBebidas('fria'));
  

    cargarBebidas('caliente');
  });
  
  