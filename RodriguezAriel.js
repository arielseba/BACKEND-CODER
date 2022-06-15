/** @format */

class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [libros];
    this.mascotas = [mascotas];
  }
  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
  addMascotas(mascota) {
    this.mascotas.push(mascota);
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addBook(libro) {
    this.libros.push(libro);
  }
  getBookNames() {
    return this.libros.map((libros) => {
      return libros["nombre"];
    });
  }
}

const usuario1 = new Usuario(
  "Ariel",
  "Rodriguez",
  { nombre: "100 años de soledad", autor: "julio" },
  "Firulays"
);

console.log(usuario1.getFullName());
usuario1.addMascotas("Rebecca");
usuario1.addMascotas("Sol");
console.log(usuario1.countMascotas());
usuario1.addBook({ nombre: "Padre rico, Padre Pobre", autor: "Robert" });
console.log(usuario1.getBookNames());
