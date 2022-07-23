const fs = require("fs");

class Contenedor {
  constructor(filename) {
    this.filename = filename;
    this.products = [];
    this.nextId = 1;
  }
  async init() {
    try {
      const data = await this.readFile();
      if (data) {
        if (data.length > 0) {
          this.products = data;
          this.nextId = this.products[data.length - 1].id + 1;
        } else {
          return "No hay productos cargados";
        }
      }
    } catch (e) {
      fs.writeFileSync("productos.json", "[]");
    }
  }
  save(obj) {
    obj.id = this.nextId;
    this.products.push(obj);
    this.nextId++;
    try {
      this.saveFile();
    } catch (e) {
      console.log(e);
    }
  }
  getById(id) {
    const data = this.products.find((p) => p.id == id);
    if (data) {
      //  console.log("El archivo con el id ingresado es el siguiente: ",data)
    }
    return data ? data : null;
  }
  async getAll() {
    const data = await this.readFile();
    if (data.length > 0) {
      this.products = data;
      this.nextId = this.products[data.length - 1].id + 1;
    }
    return this.products;
  }
  async deleteById(id) {
    const idx = this.products.findIndex((p) => p.id == id);
    if (idx >= 0) {
      this.products.splice(idx, 1);
      await this.saveFile();
    }
  }
  async updateById(id, product) {
    const idx = this.products.findIndex((p) => p.id == id);
    if (idx >= 0) {
      this.products[idx] = product;
    } else {
      return "No se encontro el producto a actualizar";
    }
    try {
      await this.saveFile();
      return `El producto con el id ${id} se actualizo de forma correcta`;
    } catch {
      return "No se encontro el producto a actualizar";
    }
  }
  saveFile() {
    return fs.promises.writeFile(this.filename, JSON.stringify(this.products));
  }
  readFile() {
    return fs.promises
      .readFile(this.filename, "utf-8")
      .then((data) => JSON.parse(data));
  }
  deleteAll() {
    fs.writeFileSync("productos.json", "[]");
  }
}

module.exports = Contenedor;
