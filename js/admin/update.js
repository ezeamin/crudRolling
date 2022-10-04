const campoNombre = document.getElementById("nombreContacto");
const campoTelefono = document.getElementById("telefonoContacto");
const campoEmail = document.getElementById("emailContacto");
const campoImagen = document.getElementById("imagenContacto");
const campoNotas = document.getElementById("notasContacto");
const buttonCargar = document.getElementById("buttonCargar")

export const cargarDatosEnFormulario = (codigo) => {
    // console.log(codigo)

    const contactos = JSON.parse(localStorage.getItem("contactos"))

    const contactoAModificar = contactos.find((elemento)=>{
        return elemento.codigo === codigo
    })

    campoNombre.value = contactoAModificar.nombre;
    campoTelefono.value = contactoAModificar.telefono;
    campoEmail.value = contactoAModificar.email;
    campoImagen.value = contactoAModificar.imagen;
    campoNotas.value = contactoAModificar.notas;

    buttonCargar.innerText = "Editar"

    sessionStorage.setItem("codigoEdicion",codigo)
}