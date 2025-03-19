let carritoPrecio = 0

const listaDeEventos = [
    {
        id: 1,
        name:"LIVE CULTUR Halloween",
        start_date:"31/10/2025",
        price: 150
    },
    {
        id: 2,
        name:"Lanzamiento de reserbo",
        start_date:"05/05/2025",
        price: 100
    },
    {
        id: 3,
        name:"Listening Party en cincodoce",
        start_date:"14/07/2025",
        price: 200
    }
];

function convertirFecha(fecha) {
    const [day, month, year] = fecha.split('/').map(Number);
    return new Date(year, month - 1, day);
}

function ordenarEventos(eventos) {
    return eventos.sort((a, b) => convertirFecha(a.start_date) - convertirFecha(b.start_date));
}

function actualizarCarrito() {
    const carritoElemento = document.querySelector("#totalCarrito");
    if (carritoElemento) {
        carritoElemento.textContent = carritoPrecio;
    }
}

function renderizarEventos(eventos) {
    const contenedorDeEventos = document.querySelector(".eventos ul");
    if (!contenedorDeEventos) return;

    contenedorDeEventos.innerHTML = "";

    if (!eventos || eventos.length === 0) {
        contenedorDeEventos.innerHTML = '<p>Próximos eventos por anunciarse</p>';
        return;
    }

    eventos.forEach((evento, index) => {
        const li = document.createElement("li");
        
        li.innerHTML = 
            `<p>${index + 1}. ${evento.name} - ${evento.start_date} - $${evento.price}</p>
            <button class="minusButton">-</button>
                <p class="cantidad">0</p>
            <button class="plusButton">+</button>`;

        contenedorDeEventos.appendChild(li);

        const cantidadP = li.querySelector(".cantidad");
        const plusButton = li.querySelector(".plusButton");
        const minusButton = li.querySelector(".minusButton");

        let cantidad = 0;

        plusButton.addEventListener("click", () => {
            if (cantidad < 5) {
                cantidad++;
                cantidadP.textContent = cantidad;
                carritoPrecio += evento.price;
                actualizarCarrito();
            }
        });

        minusButton.addEventListener("click", () => {
            if (cantidad > 0) {
                cantidad--;
                cantidadP.textContent = cantidad;
                carritoPrecio -= evento.price;
                actualizarCarrito();
            }
        });

    });
}

document.addEventListener("DOMContentLoaded", () => {
const eventosOrdenados = ordenarEventos(listaDeEventos);
renderizarEventos(eventosOrdenados);

document.querySelector("#mostrarCarrito").addEventListener("click", () => {
    let accionCarrito = prompt('El total de tu carrito es $' + carritoPrecio + '\nPresiona 1 para regresar o 2 para proceder a pagar');
})

});