const Contenedor = require('./Contenedor')

const archivo = new Contenedor('productos.txt')

const llamadaMetodos = async() => {
    await archivo.init()



    // llamada al metodo para guardar productos en el arhivo "productos.txt"
   await archivo.save({ title: 'teclado', precio: 12000, thumbnail: 'https://image.shutterstock.com/image-vector/gaming-keyboard-led-backlit-realistic-600w-1199389180.jpg' })

    await archivo.save({ title: 'monitor', precio: 62.000, thumbnail: 'https://image.shutterstock.com/image-photo/computer-monitor-screen-isolated-on-600w-1475899667.jpg' })

    await archivo.save({ title: 'mouse', precio: 4.000, thumbnail: 'https://image.shutterstock.com/image-photo/white-minimalist-mouse-isolated-on-600w-1143961571.jpg' })

    // llamada al metodo para ver todos los productos guardados en el archivo "productos.txt"
    archivo.getAll()

    // llamada al metodo para ver un producto con un id especifico guardado en el archivo "productos.txt"
    archivo.getById(1)

   // llamada al metodo para borrar un producto con un id especifico guardado en el archivo "productos.txt"
    archivo.deleteById(1)
    
    // llamada al metodo para borrar todos los productos que se encuentran en el archivos "productos.txt"
    archivo.deleteAll()


}

llamadaMetodos()
        
    








