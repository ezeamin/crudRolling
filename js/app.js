const row = document.getElementById("agendaIndex");

const contactos = JSON.parse(localStorage.getItem("contactos"));

contactos.sort((a, b) => {
  if (a.nombre > b.nombre) {
    return 1;
  }
  if (a.nombre < b.nombre) {
    return -1;
  }
  return 0;
});

const cargarCardContacto = (elemento) => {
  row.innerHTML += `
    <div class="col-sm-12 col-md-4 col-lg-3 p-2">
        <div class="card">
            <img src="${elemento.imagen}" class="card-img-top" alt="${elemento.nombre}">
            <div class="card-body">
                <h5 class="card-title">${elemento.nombre}</h5>
                <p class="card-text">${elemento.telefono}</p>
            </div>
        </div>
    </div>
    `;
};

contactos.forEach((elemento) => {
  cargarCardContacto(elemento);
});

// select

const select = document.getElementById("selectContactos");

contactos.forEach((elemento) => {
  const option = document.createElement("option");

  option.value = elemento.nombre;
  option.innerText = elemento.nombre;

  select.appendChild(option);
});

//formMensaje

const form = document.getElementById("formMensaje");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(select.value);
});

//busqueda

const campoBusqueda = document.getElementById("buscarContacto");
const formBusqueda = document.getElementById("formBusqueda");

formBusqueda.addEventListener("submit", (e) => {
  e.preventDefault();

  const busqueda = campoBusqueda.value.toLowerCase();

  const resultados = contactos.filter((elemento) => {
    return elemento.nombre.toLowerCase().includes(busqueda);
  });

  row.innerHTML = "";

  resultados.forEach((elemento) => {
    cargarCardContacto(elemento);
  });
});
