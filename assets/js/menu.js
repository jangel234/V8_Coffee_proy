document.addEventListener('DOMContentLoaded', () => {
    const btnCalientes = document.getElementById('btnCalientes');
    const btnFrias = document.getElementById('btnFrias');
    const cards = document.querySelectorAll('.card');
  
    btnCalientes.addEventListener('click', () => {
      cards.forEach(card => {
        const tipo = card.getAttribute('data-tipo');
        card.style.display = (tipo === 'caliente') ? 'block' : 'none';
      });
    });
  
    btnFrias.addEventListener('click', () => {
      cards.forEach(card => {
        const tipo = card.getAttribute('data-tipo');
        card.style.display = (tipo === 'fria') ? 'block' : 'none';
      });
    });
  });