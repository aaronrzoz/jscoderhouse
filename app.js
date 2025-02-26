const todayDate = new Date().toISOString().split('T')[0];

console.log(todayDate);

let continuar = true;

const menu = "¡Bienvenido/a!\nSelecciona una opcion del menú\n1. Ve los eventos\n2. Ve tu carrito\n3. Salir";

const listaDeEventos = [
    {
        id:1,
        name:"LIVE CULTUR Halloween",
        start_date:"31/10/2025",
        price:"$150"
    },
    {
        id:2,
        name:"Lanzamiento de reserbo",
        start_date:"05/05/2025",
        price:"$100"
    },
    {
        id:3,
        name:"Listening Party en cincodoce",
        start_date:"14/07/2025",
        price:"$200"
    }
];

let carrito = 0;

function ordenarEventos(eventos) {
    eventos.sort((a, b) => {
        const dateA = a.start_date.split('/').reverse().join('');
        const dateB = b.start_date.split('/').reverse().join('');
        return dateA.localeCompare(dateB);
    });

    let resultado = "";
    for (let i = 0; i < eventos.length; i++) {
        resultado += `${i + 1}. ${eventos[i].name} - ${eventos[i].start_date} - ${eventos[i].price}\n`;
    }

    return resultado.trim();
}

do {
    let eleccionMenu = prompt(menu);
    if (eleccionMenu == 1) {
        let mostrarEventos = true;
        while (mostrarEventos) {
            let eventosActivos = ordenarEventos(listaDeEventos);
            let eventosMenu = prompt ('Selecciona tu evento indicando su indice para añadir boletos al carrito\n' + eventosActivos + '\nPara volver al menú, escribe "Salir"');
             if (eventosMenu.toLowerCase() == 'salir') {
                mostrarEventos = false;
            } else {
                let index = parseInt(eventosMenu) - 1;
                if (index >= 0 && index < listaDeEventos.length) {
                    let precioEvento = parseInt(listaDeEventos[index].price.replace('$', ''));
                    carrito += precioEvento;
                    alert(`Agregado un boleto de "${listaDeEventos[index].name}" al carrito. Total: $${carrito}`);
                } else {
                    alert("Selección inválida. Intenta de nuevo con un evento disponible");
                }
            };
        };
    } else if (eleccionMenu == 2) {
        let mostrarCarrito = true;
        while (mostrarCarrito) {
            let accionCarrito = prompt('El total de tu carrito es $' + carrito + '\nPresiona 1 para regresar al menú o 2 para proceder a pagar');
            if (accionCarrito == 1) {
                mostrarCarrito = false;
            } else if (accionCarrito == 2){
                mostrarCarrito = false;
                continuar = false;
            }
        }
    } else if (eleccionMenu == 3) {
        continuar = false;
    } else {
        alert("No seleccionaste ninguna opción en el menú");
    };
} while (continuar);