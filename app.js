//----- Variables de inicio --------------------//
let carritoPrecio = parseFloat(localStorage.getItem('carritoPrecio') || '0');
let cantidadesGuardadas = JSON.parse(localStorage.getItem('cantidadesEventos') || '{}');
let eventosOrdenados = [];

//----- Funciones --------------------//

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

    while (contenedorDeEventos.firstChild) {
        contenedorDeEventos.removeChild(contenedorDeEventos.firstChild);
    }

    if (!eventos || eventos.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Próximos eventos por anunciarse";
        contenedorDeEventos.appendChild(mensaje);
        return;
    }

    eventos.forEach((evento, index) => {
        const li = document.createElement("li");

        const pEvento = document.createElement("p");
        pEvento.textContent = `${index + 1}. ${evento.name} - ${evento.start_date} - $${evento.price}`;

        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.classList.add("minusButton");

        const cantidadP = document.createElement("p");
        cantidadP.classList.add("cantidad");
        let cantidad = cantidadesGuardadas[evento.name] || 0;
        cantidadP.textContent = cantidad;

        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.classList.add("plusButton");

        li.appendChild(pEvento);
        li.appendChild(minusButton);
        li.appendChild(cantidadP);
        li.appendChild(plusButton);

        contenedorDeEventos.appendChild(li);

        plusButton.addEventListener("click", () => {
            if (cantidad < 5) {
                cantidad++;
                cantidadP.textContent = cantidad;
                carritoPrecio += evento.price;
                cantidadesGuardadas[evento.name] = cantidad;
                localStorage.setItem('cantidadesEventos', JSON.stringify(cantidadesGuardadas));
                localStorage.setItem('carritoPrecio', carritoPrecio);
                actualizarCarrito();
            }
        });

        minusButton.addEventListener("click", () => {
            if (cantidad > 0) {
                cantidad--;
                cantidadP.textContent = cantidad;
                carritoPrecio -= evento.price;
                cantidadesGuardadas[evento.name] = cantidad;
                localStorage.setItem('cantidadesEventos', JSON.stringify(cantidadesGuardadas));
                localStorage.setItem('carritoPrecio', carritoPrecio);
                actualizarCarrito();
            }
        });
    });
    }

async function traerDataEventos() {
  
    try {
        const dataBaseResponse = await fetch('./dataBase.json');
        const listaDeEventos = await dataBaseResponse.json();
        eventosOrdenados = ordenarEventos(listaDeEventos);
        renderizarEventos(eventosOrdenados);
    } catch (error) {
        eventosOrdenados = '';
        renderizarEventos(eventosOrdenados);
        console.log ('Hubo un error al traer los eventos', error, error.message);
    }

}

//----- Inicializador --------------------//

document.addEventListener("DOMContentLoaded", () => {
    traerDataEventos();
    actualizarCarrito();

document.querySelector("#mostrarCarrito").addEventListener("click", () => {
    let accionCarrito = prompt('El total de tu carrito es $' + carritoPrecio + '\nPresiona 1 para regresar o 2 para proceder a pagar');
})

document.querySelector("#borrarCarrito").addEventListener("click", () => {
    localStorage.setItem('carritoPrecio', '0');
    carritoPrecio = 0;
    actualizarCarrito();
    localStorage.setItem('cantidadesEventos', '{}');
    cantidadesGuardadas = {};
    renderizarEventos(eventosOrdenados);
})

});