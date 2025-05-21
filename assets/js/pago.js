window.addEventListener('load', async function () {
    const title = document.getElementById('title');
    try {
        let name = localStorage.getItem('clienteSeleccionado');
            let idPedido = JSON.parse(localStorage.getItem('A'));
            const response = await fetch('http://localhost:3000/getTotal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idPedido })
            });

            const data = await response.json();
            title.textContent = name +' paga: $'+ data.total +', con:';
            console.log(data.total)
        } catch (error) {
            alert(error.message);
        }
    
});

document.getElementById('btnCont').addEventListener('click', () => {
    localStorage.setItem('mPago',document.getElementById('payment').value);
    window.location.href = "./../html/ticket.html";
});