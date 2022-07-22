let email = sessionStorage.getItem("username");
let contadorId=0
if (email === null) {
  email = prompt("Ingrese su email");
  console.log(email.includes("@"))
  while (email.includes("@") ===false || email.length < 2) {
    alert("Ingrese un email valido");
    email = prompt("Ingrese su email");
  }
  sessionStorage.setItem("username", email);
}
document.getElementById("username").innerHTML = `Usuario: ${email}`;
const socket = io();
loadFirstData()
const btnSend = document.getElementById("send");

btnSend.onclick = (e) => {
  e.preventDefault();

  const msn = document.getElementById("msn").value;
  socket.emit("chat-in", { msn, email });
};

socket.on("chat-out", (data) => {
  const div = document.getElementById("chat");
  div.innerHTML += `<b>${data.usermane}</b> <span  style="color:gold">[${data.date}]:</span> <span style="color:green">${data.msn}</span> <br/>`;
});
// -----------------
const btnForm = document.getElementById("btnForm");

btnForm.onclick = (e) => {
  e.preventDefault();
  const name=document.getElementById("nombre").value;
  const price = document.getElementById("precio").value;
  const img = document.getElementById("imagen").value;
  contadorId+=1
  socket.emit("form-in", { name, price, img, contadorId});
};

socket.on("form-out", (data) => {
    const tableProduct = document.getElementById("tableProduct");
    tableProduct.innerHTML +=  `<tr class="bg-indigo-400 hover:bg-indigo-300" >
            <th>${data.id}</th> <th>${data.title}</th><th>${data.price}</th><th>${data.img}</th></tr>`

});




