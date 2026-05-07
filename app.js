const inputNombre    = document.getElementById('nombre');
const inputCategoria = document.getElementById('categoria');
const inputPrecio    = document.getElementById('precio');
const inputStock     = document.getElementById('stock');
const btnAgregar     = document.getElementById('btn-agregar');
const areaResultados = document.getElementById('area-resultados');
const botonesFiltro  = document.querySelectorAll('.btn-filtro');

let inventario = [
  { id: 1, nombre: "Nike",   categoria: "Tennis",  precio: 120000.00, stock: 10 },
  { id: 2, nombre: "Adidas", categoria: "Tennis",  precio: 95000.00,  stock: 7  },
  { id: 3, nombre: "Levi's", categoria: "Jeans",   precio: 65000.00,  stock: 15 },
  { id: 4, nombre: "Diesel", categoria: "Jeans",   precio: 45000.00,  stock: 12 },
  { id: 5, nombre: "Polo",   categoria: "Camisas", precio: 80000.00,  stock: 9  }
];

const renderizarLista = (lista) => {
  areaResultados.innerHTML = '';

  if (lista.length === 0) {
    areaResultados.innerHTML = '<p class="text-center text-gray-500 mt-4">No se encontraron productos.</p>';
    return;
  }

  lista.forEach((producto) => {
    const cardProducto = document.createElement('div');
    cardProducto.className = 'bg-gray-800 rounded-xl p-4 flex justify-between items-center';

    cardProducto.innerHTML = `
      <div>
        <p class="font-bold text-white">${producto.nombre}</p>
        <p class="text-sm text-gray-400">${producto.categoria}</p>
      </div>
      <div class="text-right">
        <p class="text-yellow-400 font-bold">$${producto.precio.toLocaleString('es-CO', { minimumFractionDigits: 2 })}</p>
        <p class="text-sm text-gray-400">${producto.stock} uds</p>
      </div>
    `;

    areaResultados.appendChild(cardProducto);
  });
};

const agregarProducto = () => {
  const nombre    = inputNombre.value.trim();
  const categoria = inputCategoria.value;
  const precio    = parseFloat(inputPrecio.value);
  const stock     = parseInt(inputStock.value);

  if (!nombre || !categoria || isNaN(precio) || isNaN(stock)) {
    alert('Por favor completa todos los campos.');
    return;
  }

  const nuevoProducto = {
    id:        Date.now(),
    nombre:    nombre,
    categoria: categoria,
    precio:    precio,
    stock:     stock
  };

  inventario.push(nuevoProducto);
  renderizarLista(inventario);

  inputNombre.value    = '';
  inputCategoria.value = '';
  inputPrecio.value    = '';
  inputStock.value     = '';
};

renderizarLista(inventario);

btnAgregar.addEventListener('click', agregarProducto);

botonesFiltro.forEach((botonActual) => {
  botonActual.addEventListener('click', () => {

    const categoriaSeleccionada = botonActual.dataset.categoria;

    botonesFiltro.forEach((botonReset) => {
      botonReset.className = 'btn-filtro bg-gray-700 text-white font-bold px-4 py-2 rounded-lg hover:bg-gray-600 transition';
    });

    botonActual.className = 'btn-filtro bg-yellow-400 text-gray-950 font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition';

    if (categoriaSeleccionada === '') {
      renderizarLista(inventario);
    } else {
      const productosFiltrados = inventario.filter((producto) => producto.categoria === categoriaSeleccionada);
      renderizarLista(productosFiltrados);
    }

  });
  
});