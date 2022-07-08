const express = require('express')
const app = express()
const PORT = 8080
const router = require('./routes')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/uploads',express.static('uploads'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo ${PORT}`)
})

app.use('/api/productos',router)

