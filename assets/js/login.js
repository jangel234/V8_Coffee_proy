window.addEventListener('load', function () {
    localStorage.clear();
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("username").value.trim();
    const telefono = document.getElementById("telephone").value.trim();

    if (!usuario || !telefono) {
        alert('Por favor rellene los campos');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, telefono })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Error en el login');

        localStorage.setItem('idCajero', data.user.id_Empleado);

        if (data.user.rol === 'Barista') {
            // Aqui va a donde se dirigira si es barista
            window.location.href = './assets/html/barista.html';
        } else if (data.user.rol === 'Encargado') {
            // Aqui va a donde se dirigira si es Encargado
            window.location.href = './assets/html/administrador.html';
        } else if (data.user.rol === 'Cajero') {
            // Aqui va a donde se dirigira si es Cajero
            localStorage.setItem('idCajero', data.user.id_Empleado);
            window.location.href = './assets/html/usuario.html';
        }

    } catch (error) {
        alert(error.message);
    }
});