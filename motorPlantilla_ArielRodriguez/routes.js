const express = require('express')
const router = express.Router()
const multer = require('multer')
const Contenedor = require('./Contenedor')

const archivo = new Contenedor('productos.json')

archivo.init()

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, file.originalname),
})

const upload = multer({ storage })

// GET PARA TODOS LOS PRODUCTOS
router.get('/', async (req, res) => {
    const productos = await archivo.getAll()
    if (productos.length > 0) return res.status(200).json(productos)
    return res
        .status(400)
        .json({ error: 'No se encontraron productos en el archivo' })
})
// GET PARA BUSCAR UN PRODUCTO POR ID
router.get('/:id', async (req, res) => {
    const productos = await archivo.getAll()
    const id = Number(req.params.id)
    const producto = productos.find((producto) => producto.id === id)
    if (producto) return res.status(200).json(producto)
    return res.status(400).json({ error: 'No se encontro el producto buscado' })
})
// POST
router.post('/', upload.single('imgProduct'), async (req, res) => {
    const productos = await archivo.getAll()
    const ids = productos.map((producto) => producto.id)
    const maxId = Math.max(...ids)
    const file = req.file
    const producto = req.body
    if (!producto)
        return res
            .status(400)
            .json({ error: 'Hubo un error al cargar el producto' })

    const nuevoProducto = {
        id: maxId + 1,
        title: producto.title,
        price: producto.price,
        img: file.path || 'No hay imagen del producto',
    }
    archivo.save(nuevoProducto)
    return res.status(200).json({ uploadProduct: nuevoProducto })
})

module.exports = router
