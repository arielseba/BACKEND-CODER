const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const Contenedor = require("./Contenedor");
const ContenedorChat = require("./ContenedorChat");
const multer = require("multer");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 8080;

app.use("/uploads", express.static("uploads"));
app.use("/public", express.static(__dirname + "/public"));

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const archivo = new Contenedor("productos.json");
const archivoMensajes = new ContenedorChat("mensajes.json");
archivo.init();
archivoMensajes.init();

let productos = [];
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

// GET PARA CARGA DE PRODUCTOS
app.get("/", async (req, res) => {
  productos = await archivo.getAll();
  return res.render("form.ejs", { productos });
});
app.get("/data",  (req, res) => {
  const data=archivoMensajes.getAll()
  return res.json({ data } );
});

// POST
app.post("/", upload.single("imgProduct"), async (req, res) => {
  const productos = await archivo.getAll();
  const ids = productos.map((producto) => producto.id);
  const maxId = Math.max(...ids);
  const file = req.file;
  const producto = req.body;

  const nuevoProducto = {
    id: maxId + 1,
    title: producto.title,
    price: producto.price,
    img: file?.path ?? "No hay imagen del producto",
  };

  archivo.save(nuevoProducto);
  return res.render("form.ejs", { productos });
});

app.post("/mensajes", async (req, res) => {
  const mensajes = await archivoMensajes.getAll();
  const ids = mensajes.map((mensaje) => mensaje.id);
  const maxId = Math.max(...ids);
  // const usermane = window.sessionStorage.getItem("username");
  const msj = req.body;
  console.log(msj);
  const nuevoMensaje = {
    id: maxId + 1,
    email: "usermane",
    date: new Date().toLocaleDateString(),
    msj: msj.msj,
  };

  archivoMensajes.save(nuevoMensaje);
  return res.json(msj);
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("Se conecto alguien");

  socket.on("chat-in", (data) => {
    const time = new Date().toLocaleTimeString();
    const dataOut = {
      msn: data.msn,
      usermane: data.email,
      date: time,
    }
    archivoMensajes.save(dataOut)

    io.sockets.emit("chat-out", dataOut);
  });
});

io.on("connection", (socket) => {
  socket.on("form-in", (data) => {
  console.log(data.img)

    const nuevoProducto = {
    id: data.contadorId,
    title: data.name,
    price: data.price,
    img: data.img,
    };
    io.sockets.emit("form-out", nuevoProducto);
  });
});

