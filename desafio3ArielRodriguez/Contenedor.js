const fs = require('fs')

class Contenedor{
    constructor(filename) {
        this.filename = filename

        this.products =[]
        this.nextId=1
    }

    async init() {
        try {
            const data= await this.readFile()
            if (data.length > 0) {
                this.products = data
                this.nextId=this.products[data.length-1].id+1
            }

        } catch (e) {
            console.log(('No se pudo leer la data'))
        }
    }

    async save(obj) {
        obj.id = this.nextId
        this.products.push(obj)
        this.nextId++
        try {
            await this.saveFile()
        } catch (e) {
            console.log(e)
        }
    }

     getById(id) {
         const data = this.products.find(p => p.id == id)
         if (data) {
            //  console.log("El archivo con el id ingresado es el siguiente: ",data)
         }
        return data ? data:null
    }

    getAll() {
        if (this.products.length >= 0) {
            // console.log('Todos los productos guardados en el archivo', this.products)
        } else {
            // console.log('No hay productos para mostrar')
        }

        return this.products
    }

    async deleteById(id) {
        const idx = this.products.findIndex(p => p.id == id)
    
        this.products.splice(idx, 1)

        try {
            await this.saveFile()
            if (idx >= 0) {
                // console.log(`El producto con el id ${id} ha sido borrado con exito`)
            } else {
                // console.log('No se encontro el producto que deberia borrarse')
            }
        }
        catch (e) {
                    // console.log('Hubo un error al borrar el archivo')
            }
    }

      saveFile() {
        return fs.promises.writeFile(this.filename,JSON.stringify(this.products))
    }

    readFile() {
        return fs.promises.readFile(this.filename,'utf-8').then(data=>JSON.parse(data))
    }

    async deleteAll() {
          this.nextId=1
        this.products=[]
       await fs.promises.writeFile(this.filename,JSON.stringify(this.products)).finally(console.log('Se borraron todos los productos del archivo "productos.txt"'))
        
    }
}
module.exports = Contenedor
