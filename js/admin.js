import { Contacto } from "./Contacto.js";
import { crearContactoTabla } from "./crearContacto.js";
import {
  validateEmail,
  validateName,
  validateNumber,
  validateURL,
} from "./validators.js";

let contactosLS = localStorage.getItem("contactos")
contactosLS = JSON.parse(contactosLS)
//console.log(contactosLS)

let contactos = [];

if(contactosLS !== null){
  contactos = contactosLS;

  contactos.forEach(elemento => {
    crearContactoTabla(elemento);
  })
}

const formularioContacto = document.getElementById("formContacto");

const campoNombre = document.getElementById("nombreContacto");
const campoTelefono = document.getElementById("telefonoContacto");
const campoEmail = document.getElementById("emailContacto");
const campoImagen = document.getElementById("imagenContacto");
const campoNotas = document.getElementById("notasContacto");

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
  contactos.push(contacto);
  //console.log(contactos)

  // JavaScript Object Notation
  const contactosJSON = JSON.stringify(contactos);
  //console.log(contactosJSON);

  localStorage.setItem("contactos", contactosJSON);
}

formularioContacto.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    validateName(nombre, campoNombre) &&
    validateNumber(telefono, campoTelefono) &&
    validateEmail(email, campoEmail) &&
    validateURL(imagen, campoImagen)
  ) {
    const contacto = new Contacto(nombre, telefono, email, imagen, notas);
    crearContactoTabla(contacto);
    agregarContactoALS(contacto);
  } else {
    console.log("Algun dato no es valido");
  }
});
