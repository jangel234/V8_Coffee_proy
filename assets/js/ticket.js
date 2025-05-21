window.addEventListener('load', async function () {
    const total = document.getElementById('total');
    const pedido = document.getElementById('pedido');
    let idPedido = JSON.parse(localStorage.getItem('A'));
    pedido.textContent = 'Pedido #' + idPedido;
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
            span.textContent = '+ '+ product.extras;
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

getElementById('backMnu').addEventListener('click', () => {

    window.location.href = "./../html/menu.html";
});