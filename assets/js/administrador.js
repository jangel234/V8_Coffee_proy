document.addEventListener("DOMContentLoaded", async () => {
  const formatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });
  const Ventas_totales = document.getElementById('Ventas');
  const Promedio_diario = document.getElementById('Promedio_d');
  const Producto_mas= document.getElementById('Producto_m');
  const Mejor_dia = document.getElementById('Mejor_d');

  //Carga de las metricas de ventas
  try {
    // Total de ventas
    const ventasRes = await fetch('http://localhost:3000/api/ventas-totales');
    const ventas = await ventasRes.json();
    Ventas_totales.innerHTML = `<h3>Ventas Totales</h3>${formatter.format(ventas[0]?.total_ventas || 0)}`;

    // Promedio diario
    const promedioRes = await fetch('http://localhost:3000/api/promedio-diario');
    const promedio = await promedioRes.json();
    Promedio_diario.innerHTML = `<h3>Promedio Diario</h3>${formatter.format(promedio[0]?.promedio_diario || 0)}`;

    // Producto más vendido
    const productoRes = await fetch('http://localhost:3000/api/producto-mas-vendido');
    const producto = await productoRes.json();
    Producto_mas.innerHTML = `<h3>Producto Más Vendido</h3>${producto[0]?.nombre_producto || 'Sin datos'}`;

    // Mejor día
    const diaRes = await fetch('http://localhost:3000/api/mejor-dia');
    const dia = await diaRes.json();
    const fecha = new Date(dia[0]?.dia);
    const diaTexto = fecha.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
    const monto = formatter.format(dia[0]?.total_dia || 0);
    Mejor_dia.innerHTML = `<h3>Mejor Día</h3>${diaTexto} - ${monto}`;

  } catch (err) {
    console.error("Error al cargar métricas:", err);
  }


  //Carga de la tabla para las ventas por producto
   try {
    const res = await fetch('http://localhost:3000/api/ventas-producto');
    const productos = await res.json();

    const tabla = document.getElementById('Ventas_producto');
    const filasExistentes = tabla.querySelectorAll("tr:not(:first-child)");
    filasExistentes.forEach(f => f.remove()); // Borra todas menos la cabecera

    let totalGeneral = 0;
    productos.forEach(p => {
      const fila = document.createElement("tr");
      const formatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

      fila.innerHTML = `
        <td>${p.producto}</td>
        <td>${p.categoria}</td>
        <td>${p.cantidad_vendida}</td>
        <td>${formatter.format(p.precio)}</td>
        <td>${formatter.format(p.total)}</td>
      `;
      tabla.appendChild(fila);
      totalGeneral += parseFloat(p.total);
    });

    const totalFinal = document.createElement("tr");
    totalFinal.classList.add("total");
    totalFinal.innerHTML = `
      <td colspan="4">Total General</td>
      <td>${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(totalGeneral)}</td>
    `;
    tabla.appendChild(totalFinal);

  } catch (err) {
    console.error("Error al cargar ventas por producto:", err);
  }
});