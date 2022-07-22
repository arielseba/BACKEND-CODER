const fs = require("fs");

class ContenedorChat {
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
      fs.writeFileSync("mensajes.json", "[]");
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
  async getAll() {
    const data = await this.readFile();
    if (data.length > 0) {
      this.products = data;
      this.nextId = this.products[data.length - 1].id + 1;
    }
    return this.products;
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
    fs.writeFileSync("mensajes.json", "[]");
  }
}

module.exports = ContenedorChat;
