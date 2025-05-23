const imagenesProductos = {
  "Cappuccino Clásico": "../img-productos/cappuccino-1024x1024-1.jpg",
  "Moka Blanco": "../img-productos/Matcha-Green-Tea-Latte-1024x124.jpg",
  "Mocha Blanco": "../img-productos/Matcha-Green-Tea-Latte-1024x124.jpg",
  "Café Americano": "../img-productos/Caffe-Americano-768x768-1.jpg",
  "Café Latte": "../img-productos/Caffe-Latte-1024x1024-1.jpg",
  "Café Frappé": "../img-productos/Coffee-Frappuccino-1024x1024.png",
  "Café Helado": "../img-productos/Iced-Cold-Foam-Cappuccino-2048x2048-1-1024x1024.jpg",
  "Matcha latte": "../img-productos/Matcha-Green-Tea-Latte-1024x1024.jpg",
  "Pastel de Chocolate": "../img-productos/2022-02_Pastel de Chocolate_1.png",
  "Pastel de Fresa": "../img-productos/2022-02_Cheesecake Brulee con Frambuesa_1.png",
  "Galleta de Avena": "../img-productos/2024-03_GALLETA-AVENA.png.webp",
  "Galleta de Chocolate": "../img-productos/download (1).jpg",
  "Brownie": "../img-productos/brownie.jpg",
};
document.addEventListener('DOMContentLoaded', () => {
  const btnCalientes = document.getElementById('btnCalientes');
  const btnFrias = document.getElementById('btnFrias');
  const btnPostre = document.getElementById('btnPostre');
  const grid = document.getElementById('gridBebidas');
  const Subtitulo = document.getElementById('hero_div');
  const cliente = localStorage.getItem('clienteSeleccionado');

  const botonesCategorias = [btnCalientes, btnFrias, btnPostre];

  const activarBoton = (botonActivo) => {
    botonesCategorias.forEach(btn => btn.classList.remove('btn-categoria-activa'));
    botonActivo.classList.add('btn-categoria-activa');
  };

  btnCalientes.addEventListener('click', () => {
    activarBoton(btnCalientes);
    cargarBebidas('caliente');
  });

  btnFrias.addEventListener('click', () => {
    activarBoton(btnFrias);
    cargarBebidas('fria');
  });

  btnPostre.addEventListener('click', () => {
    activarBoton(btnPostre);
    cargarPostres();
  });

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
          const rutaImagen = imagenesProductos[producto.nombre] || 'images/default.jpg';

          const card = document.createElement('article');
          card.classList.add('card');
          card.innerHTML = `
            <img src="${rutaImagen}" alt="${producto.nombre}" class="card-image" />
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
  activarBoton(btnCalientes);
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
      const rutaImagen = imagenesProductos[producto.nombre] || 'images/default.jpg';

      const card = document.createElement('article');
      card.classList.add('card');

      card.innerHTML = `
        <img src="${rutaImagen}" alt="${producto.nombre}" class="card-image-dessert" />
        <div class="card-content">
          <h3>${producto.nombre} - ${producto.tamanio}</h3>
          <p>${producto.procedimientos}</p>
          <a href="extras.html?drink=${encodeURIComponent(producto.nombre)}" class="btn-seleccionar" onClick="selectedProd(${producto.id})">Seleccionar</a>
        </div>
      `;

      gridPostres.appendChild(card);
    });
  } catch (err) {
    console.error('Error cargando postres:', err);
  }
};

//borrado del local
window.addEventListener('beforeunload', function () {
    //localStorage.removeItem('clienteSeleccionado');
});


function selectedProd(id) {
  localStorage.setItem('idProd', id);
}




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