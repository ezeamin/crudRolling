export class Contacto {
  constructor(nombre, telefono, email, imagen, notas) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
    this.imagen = imagen;
    this.notas = notas;
    this.codigo = Math.floor(Math.random() * 1000);
  }
}
