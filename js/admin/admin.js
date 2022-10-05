import { Contacto } from "./Contacto.js";
import { crearContactoTabla } from "./crearContactoTabla.js";
import {
  validateEmail,
  validateName,
  validateNumber,
  validateURL,
} from "./validators.js";

let contactosLS = localStorage.getItem("contactos");
contactosLS = JSON.parse(contactosLS);
//console.log(contactosLS)

let contactos = [];

if (contactosLS !== null) {
  contactos = contactosLS;

  contactos.forEach((elemento) => {
    crearContactoTabla(elemento);
  });
}

const formularioContacto = document.getElementById("formContacto");

const campoNombre = document.getElementById("nombreContacto");
const campoTelefono = document.getElementById("telefonoContacto");
const campoEmail = document.getElementById("emailContacto");
const campoImagen = document.getElementById("imagenContacto");
const campoNotas = document.getElementById("notasContacto");

const buttonCargar = document.getElementById("buttonCargar");

let nombre = "";
let telefono = "";
let email = "";
let imagen = "";
let notas = "";

campoNombre.addEventListener("blur", (e) => {
  if (validateName(e.target.value, campoNombre)) {
    nombre = e.target.value;
  }
});

campoTelefono.addEventListener("blur", (e) => {
  if (validateNumber(e.target.value, campoTelefono)) {
    telefono = e.target.value;
  }
});

campoEmail.addEventListener("blur", (e) => {
  if (validateEmail(e.target.value, campoEmail)) {
    email = e.target.value;
  }
});

campoImagen.addEventListener("blur", (e) => {
  if (validateURL(e.target.value, campoImagen)) {
    imagen = e.target.value;
  }
});

campoNotas.addEventListener("blur", (e) => {
  notas = e.target.value;
});

const agregarContactoALS = (contacto) => {
  // agrego contacto a la lista
  contactos.unshift(contacto);
  //console.log(contactos)

  // JavaScript Object Notation
  const contactosJSON = JSON.stringify(contactos);
  //console.log(contactosJSON);

  localStorage.setItem("contactos", contactosJSON);
};

formularioContacto.addEventListener("submit", (e) => {
  e.preventDefault();

  let isEditando;

  if (buttonCargar.innerText === "Editar") {
    isEditando = true;
  } else isEditando = false;

  nombre = campoNombre.value;
  telefono = campoTelefono.value;
  email = campoEmail.value;
  imagen = campoImagen.value;
  notas = campoNotas.value;

  if (
    validateName(nombre, campoNombre) &&
    validateNumber(telefono, campoTelefono) &&
    validateEmail(email, campoEmail) &&
    validateURL(imagen, campoImagen)
  ) {
    if (!isEditando) {
      // esta creando un contacto nuevo
      const contacto = new Contacto(nombre, telefono, email, imagen, notas);

      agregarContactoALS(contacto);

      Swal.fire({
        title: "Exito",
        text: "El contacto se creó exitosamente",
        icon: "success",
      });
    } else {
      // esta editando un contacto
      const codigo = Number(sessionStorage.getItem("codigoEdicion"));
      sessionStorage.removeItem("codigoEdicion");

      const contactoIndice = contactos.findIndex((elemento) => {
        return elemento.codigo === codigo;
      });

      contactos[contactoIndice].nombre = nombre;
      contactos[contactoIndice].telefono = telefono;
      contactos[contactoIndice].email = email;
      contactos[contactoIndice].imagen = imagen;
      contactos[contactoIndice].notas = notas;

      localStorage.setItem("contactos", JSON.stringify(contactos));

      Swal.fire({
        title: "Exito",
        text: "El contacto se editó correctamente",
        icon: "success",
      });

      buttonCargar.innerText = "Cargar";
    }

    recargarDatos();

    campoNombre.value = "";
    campoTelefono.value = "";
    campoEmail.value = "";
    campoImagen.value = "";
    campoNotas.value = "";

    nombre = "";
    telefono = "";
    email = "";
    imagen = "";
    notas = "";
  } else {
    Swal.fire({
      title: "Error",
      text: "Revisa los campos",
      icon: "warning",
    });
  }
});

export const recargarDatos = () => {
  const contactosLS = JSON.parse(localStorage.getItem("contactos"));

  //vaciar tabla
  const tbody = document.getElementById("tbody__admin");

  tbody.innerHTML = "";

  // crear nuevas filas
  contactosLS.forEach((elemento) => {
    crearContactoTabla(elemento);
  });
};