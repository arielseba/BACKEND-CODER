const express = require('express')
const Contenedor = require('./Contenedor')
const multer = require('multer')
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))

app.set('views', './views')
app.set('view engine', 'ejs')

const archivo = new Contenedor('productos.json')
const msj = 'Complete todos los datos solicitados'
archivo.init()
let productos = []
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, file.originalname),
})

const upload = multer({ storage })

// GET PARA CARGA DE PRODUCTOS
app.get('/', async (req, res) => {
    res.render('form.ejs')
})
// POST
app.post('/productos', upload.single('imgProduct'), async (req, res) => {
    const productos = await archivo.getAll()
    const ids = productos.map((producto) => producto.id)
    const maxId = Math.max(...ids)
    const file = req.file
    const producto = req.body

    const nuevoProducto = {
        id: maxId + 1,
        title: producto.title,
        price: producto.price,
        img: file?.path ?? 'No hay imagen del producto',
    }

    archivo.save(nuevoProducto)
    return res.render('productos.ejs', { productos })
})

app.get('/productos', async (req, res) => {
    productos = await archivo.getAll()
    return res.render('productos.ejs', { productos })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo ${PORT}`)
})
