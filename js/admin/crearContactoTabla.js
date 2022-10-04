import { deleteContacto } from "./delete.js";
import { cargarDatosEnFormulario } from "./update.js";

export const crearContactoTabla = (contacto) => {
  const tbody = document.getElementById("tbody__admin");

  const tr = document.createElement("tr");

  //
  const td1 = document.createElement("td");

  td1.innerText = contacto.codigo;

  tr.appendChild(td1);
  //
  //
  const td5 = document.createElement("td");
  const img = document.createElement("img");

  img.src = contacto.imagen;
  img.alt = contacto.nombre;
  img.style.width = "100px";
  img.style.height = "100px";
  img.style.objectFit = "cover";

  td5.appendChild(img);

  tr.appendChild(td5);
  //
  //
  const td2 = document.createElement("td");

  td2.innerText = contacto.nombre;

  tr.appendChild(td2);
  //
  //
  const td3 = document.createElement("td");

  td3.innerText = contacto.telefono;

  tr.appendChild(td3);
  //
  //
  const td4 = document.createElement("td");

  td4.innerText = contacto.email;

  tr.appendChild(td4);
  //
  //
  const td6 = document.createElement("td");

  td6.innerText = contacto.notas;

  tr.appendChild(td6);
  //
  const td7 = document.createElement("td");
  const buttonEditar = document.createElement("button");
  const buttonEliminar = document.createElement("button");

  buttonEditar.classList = "btn btn-warning mb-2 me-2"
  buttonEliminar.classList = "btn btn-danger mb-2"

  buttonEditar.innerText = "Editar"
  buttonEliminar.innerText = "Eliminar"

  buttonEditar.onclick = () => {
    cargarDatosEnFormulario(contacto.codigo)
  }

  buttonEliminar.onclick = () => {
    deleteContacto(contacto.codigo)
  }

  td7.appendChild(buttonEditar)
  td7.appendChild(buttonEliminar)

  tr.appendChild(td7);
  //

  tbody.appendChild(tr);
};
