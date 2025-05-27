window.addEventListener('load', function () {
  initPago();
});

async function initPago() {
  const title = document.getElementById('tittle');
  const name = localStorage.getItem('clienteSeleccionado') || 'Cliente';
  const idPedido = JSON.parse(localStorage.getItem('A'));
  let total = 0;

  try {
    const response = await fetch('http://localhost:3000/getTotal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idPedido })
    });
    const data = await response.json();
    total = data.total;
    title.textContent = `${name} paga: $${total}, con:`;
  } catch (error) {
    alert("Error al obtener el total: " + error.message);
    return;
  }

  document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', () => {
      title.textContent = `${name} paga: $${total}, con: ${radio.value}`;
    });
  });
}

function mPago(mp) {
  localStorage.setItem('mPago', mp);
  window.location.href = "./../html/ticket.html";
}
