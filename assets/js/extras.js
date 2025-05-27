document.getElementById('continue').addEventListener('click', async () => {
    //console.log('continuar');
    let pedido = localStorage.getItem('P');
    if (pedido) {
        try {
            let producto = localStorage.getItem('idProd');
            let pedido = localStorage.getItem('P');
            let extrass = document.querySelectorAll('#chk');
            let extras = '';
            extrass.forEach(element => {
                if (element.checked) {
                    extras = extras + (element.value) + ' | ';
                }
            });
            const response = await fetch('http://localhost:3000/newPP', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ producto, pedido, extras })
            });

            const data = await response.json();
            console.log(data);

        } catch (error) {
            alert(error.message);
        }
    } else {
        try {
            let idCliente = localStorage.getItem('idSelectedClient');
            let idEmpleado = localStorage.getItem('idCajero');
            const response = await fetch('http://localhost:3000/newOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idCliente, idEmpleado })
            });

            const data = await response.json();
            localStorage.setItem('P', data.pedidoId);

        } catch (error) {
            alert(error.message);
        }
        try {
            let producto = localStorage.getItem('idProd');
            let pedido = localStorage.getItem('P');
            let extrass = document.querySelectorAll('#chk');
            let extras = '';
            extrass.forEach(element => {
                if (element.checked) {
                    extras = extras + (element.value) + ' | ';
                }
            });
            const response = await fetch('http://localhost:3000/newPP', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ producto, pedido, extras })
            });

            const data = await response.json();
            localStorage.setItem('A', pedido);

        } catch (error) {
            alert(error.message);
        }
    }
    localStorage.removeItem('P')
    window.location.href = "./../html/pago.html"
});

document.getElementById('addOther').addEventListener('click', async () => {
    console.log('agrega otro');
    let pedido = localStorage.getItem('P');
    if (pedido) {
        try {
            let producto = localStorage.getItem('idProd');
            let pedido = localStorage.getItem('P');
            let extrass = document.querySelectorAll('#chk');
            let extras = '';
            extrass.forEach(element => {
                if (element.checked) {
                    extras = extras + (element.value) + ' | ';
                }
            });
            const response = await fetch('http://localhost:3000/newPP', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ producto, pedido, extras })
            });

            const data = await response.json();
            console.log(data);

        } catch (error) {
            alert(error.message);
        }
    } else {
        try {
            let idCliente = localStorage.getItem('idSelectedClient');
            let idEmpleado = localStorage.getItem('idCajero');
            const response = await fetch('http://localhost:3000/newOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idCliente, idEmpleado })
            });

            const data = await response.json();
            localStorage.setItem('P', data.pedidoId);

        } catch (error) {
            alert(error.message);
        }
        try {
            let producto = localStorage.getItem('idProd');
            let pedido = localStorage.getItem('P');
            let extrass = document.querySelectorAll('#chk');
            let extras = '';
            extrass.forEach(element => {
                if (element.checked) {
                    extras = extras + ' | ' + (element.value);
                }
            });
            const response = await fetch('http://localhost:3000/newPP', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ producto, pedido, extras })
            });

            const data = await response.json();
            localStorage.setItem('A', pedido);

        } catch (error) {
            alert(error.message);
        }
    }

    window.location.href = "./../html/menu.html"
});