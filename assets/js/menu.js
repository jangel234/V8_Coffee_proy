document.addEventListener('DOMContentLoaded', () => {
  const btnCalientes = document.getElementById('btnCalientes');
  const btnFrias = document.getElementById('btnFrias');
  const btnPostre = document.getElementById('btnPostre');
  const grid = document.getElementById('gridBebidas');
  const Subtitulo = document.getElementById('hero_div');
  const cliente = localStorage.getItem('clienteSeleccionado');

  if(!cliente){
    const clienteCard = document.createElement('div');
    const nombreCliente = document.createElement('h2');
    nombreCliente.className = 'hero-title';
    nombreCliente.textContent = "Descubre tu bebida favorita";
    clienteCard.appendChild(nombreCliente);
    Subtitulo.appendChild(clienteCard);
  } else {

    const clienteCard = document.createElement('div');
    const nombreCliente = document.createElement('h2');
    nombreCliente.className = 'hero-title';
    nombreCliente.textContent = "Descubre tu bebida favorita: " + `${cliente}`;
    clienteCard.appendChild(nombreCliente);
    Subtitulo.appendChild(clienteCard);
  }

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
        if (producto.tamanio !== 'Postre') {
        const card = document.createElement('article');
        card.classList.add('card');
        card.innerHTML = `
          <div class="card-content">
            <h3>${producto.nombre} - ${producto.tamanio}</h3>
            <p>${producto.procedimientos}</p>
            <a href="extras.html?drink=${encodeURIComponent(producto.nombre)}" class="btn-seleccionar" onClick="selectedProd(${producto.id})">Seleccionar</a>
          </div>
        `;
        grid.appendChild(card);
        }
      });
    } catch (err) {
      console.error('Error cargando bebidas:', err);
    }
  };

  btnCalientes.addEventListener('click', () => cargarBebidas('caliente'));
  btnFrias.addEventListener('click', () => cargarBebidas('fria'));
  btnPostre.addEventListener('click', () => cargarPostres());

  // Carga inicial con bebidas calientes
  cargarBebidas('caliente');
});

// Función cargar postres
const cargarPostres = async () => {
  try {
    const url = 'http://localhost:3000/dessertProducts';
    const response = await fetch(url);
    const data = await response.json();

    const gridPostres = document.getElementById('gridBebidas');
    gridPostres.innerHTML = '';

    data.forEach((producto) => {
      const card = document.createElement('article');
      card.classList.add('card');
      card.innerHTML = `
        <div class="card-content">
          <h3>${producto.nombre}</h3>
          <p>${producto.procedimientos}</p>
          <a href="extras.html?drink=${encodeURIComponent(producto.nombre)}" class="btn-seleccionar" onClick="selectedProd(${producto.id})">Seleccionar</a>
        </div>
      `;
      gridPostres.appendChild(card);
    });
  } catch (err) {
    console.error('Error cargando postres:', err);
  }
}

//borrado del local
window.addEventListener('beforeunload', function () {
    //localStorage.removeItem('clienteSeleccionado');
});


function selectedProd(id) {
  localStorage.setItem('idProd', id);
}