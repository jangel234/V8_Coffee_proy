document.addEventListener('DOMContentLoaded', () => {
  const btnCalientes = document.getElementById('btnCalientes');
  const btnFrias = document.getElementById('btnFrias');
  const grid = document.getElementById('gridBebidas');

  // Función para cargar bebidas frías o calientes
  const cargarBebidas = async (tipo) => {
    try {
      const url =
        tipo === 'caliente'
          ? 'http://localhost:3000/hotProducts'
          : 'http://localhost:3000/coldProducts';

      const response = await fetch(url);
      const data = await response.json();

      grid.innerHTML = '';

      data.forEach((producto) => {
        const card = document.createElement('article');
        card.classList.add('card');
        card.innerHTML = `
          <div class="card-content">
            <h3>${producto.nombre}</h3>
            <p>${producto.procedimientos}</p>
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

  // Carga inicial con bebidas calientes
  cargarBebidas('caliente');
});
