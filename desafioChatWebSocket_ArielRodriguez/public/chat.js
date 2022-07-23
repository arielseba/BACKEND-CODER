
let email = sessionStorage.getItem("username");
let contadorId=0
if (email === null) {
  email = prompt("Ingrese su email");
  while (email.includes("@") ===false || email.length < 2) {
    alert("Ingrese un email valido");
    email = prompt("Ingrese su email");
  }
  sessionStorage.setItem("username", email);
}
document.getElementById("username").innerHTML = `Usuario: ${email}`;

const socket = io();
loadFirstData()

// ---Productos
const btnForm = document.getElementById("btnForm");

btnForm.onclick = (e) => {
  e.preventDefault();
  const name=document.getElementById("nombre").value;
  const price = document.getElementById("precio").value;
  const img = document.getElementById("imagen").value;
  contadorId+=1
  socket.emit("form-in", { name, price, img, contadorId});
};

socket.on("form-out", (productos) => {
  addDataToTable(productos)

});

//  Mensajes
const btnSend = document.getElementById("send");

btnSend.onclick = (e) => {
  e.preventDefault();
  const msn = document.getElementById("msn").value;
  socket.emit("chat-in", { msn, email });
};

socket.on("chat-out", (data) => {
addDataToDiv(data)
});

// Funciones
function loadDataToDiv(data,productos) {
  data.forEach(d => addDataToDiv(d))
  productos.forEach(p=>addDataToTable(p))
}

function loadFirstData() {
  fetch('/data')
    .then(data => data.json())
    .then(d => loadDataToDiv(d.data,d.productos))
    .catch(e => console.log(e))
}

function addDataToDiv(data) {
   const div = document.getElementById("chat");
  div.innerHTML += `<b>${data.usermane}</b> <span  style="color:gold">[${data.date}]:</span> <span style="color:green">${data.msn}</span> <br/>`;
}

function addDataToTable(productos) {
  const tableProduct = document.getElementById("tableProduct");
    tableProduct.innerHTML +=  `<tr class="bg-indigo-400 hover:bg-indigo-300" >
            <th>${productos.id}</th> <th>${productos.title}</th><th>${productos.price}</th><th>${productos.img}</th></tr>`
}




