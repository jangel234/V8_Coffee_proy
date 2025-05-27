window.addEventListener('load', async function () {
    const total = document.getElementById('total');
    const pedido = document.getElementById('pedido');
    const mPag = document.getElementById('mPago');

    let idPedido = JSON.parse(localStorage.getItem('A'));
    let mpay = localStorage.getItem('mPago'); 

    pedido.textContent = 'Pedido #' + idPedido;
    mPag.textContent = mpay;

    try {

        const response = await fetch('http://localhost:3000/getTotal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idPedido })
        });

        const data = await response.json();
        total.textContent = '$' + data.total;
        //console.log(data.total)
    } catch (error) {
        alert(error.message);
    }
    try {
        let order = document.getElementById('order');

        const response = await fetch('http://localhost:3000/getPedido', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idPedido })
        });

        const data = await response.json();
        //console.log(data)
        data.forEach(product => {
            let li = document.createElement('li');
            let br = document.createElement('br');
            let br2 = document.createElement('br');
            let span = document.createElement('span');
            li.textContent = product.nombre;
            span.textContent = '+ ' + product.extras;
            span.className = 'order-list__extra';

            li.appendChild(br2);
            li.appendChild(span);
            order.appendChild(li);
            order.appendChild(br);
        });
    } catch (error) {
        alert(error.message);
    }

});

document.getElementById('backMnu').addEventListener('click', () => {
    let user = localStorage.getItem('idCajero');
    localStorage.clear();
    localStorage.setItem('idCajero', user)
    window.location.href = "./../html/usuario.html";
});