console.log("socket");

const socket = io();

socket.on("products", (data) => {
  const template = data
    .map(
      (each) => `
      <div class="card m-2" style="width: 360px">
        <img src="${each.imagen}" style="height: 240px" class="card-img-top object-fit-cover" alt="${each.nombre}">
        <h5 class="p-2 text-center card-title">${each.nombre}</h5>
      </div>
    `
    )
    .join("");
<<<<<<< HEAD
  document.querySelector("#products").innerHTML = template; 
=======
  document.querySelector("#products").innerHTML = template;
>>>>>>> 7bd71d8b1780526666cd3a2122f4536857a44108
});

document.querySelector("#newProduct").addEventListener("click", (event) => {
  event.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const imagen = document.querySelector("#imagen").value;
  const precio = document.querySelector("#precio").value;
  const stock = document.querySelector("#stock").value;
  // const idcat = document.querySelector("#idcat").value;
  const date = document.querySelector("#date").value;
  const data = {};
  nombre && (data.nombre = nombre);
  imagen && (data.imagen = imagen); 
  precio && (data.precio = precio);
  stock && (data.stock = stock);
  // idcat && (data.idcat = idcat);
  date && (data.date = date);
  //console.log(data);
  socket.emit("newProduct", data);
});
