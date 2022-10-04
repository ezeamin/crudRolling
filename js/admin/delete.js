import { recargarDatos } from "./admin.js";

export const deleteContacto = (codigo) => {
  const contactos = JSON.parse(localStorage.getItem("contactos"));

  const contactoAEliminarIndex = contactos.findIndex((elemento) => {
    return elemento.codigo === codigo;
  });

  Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás deshacer esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar contacto",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      contactos.splice(contactoAEliminarIndex, 1);

      localStorage.setItem("contactos", JSON.stringify(contactos));

      recargarDatos();

      Swal.fire({
        title: "Eliminado",
        text: "El contacto ha sido eliminado",
        icon: "success",
      });
    }
  });
};
