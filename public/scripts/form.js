const selector = document.querySelector("#create");
selector.addEventListener("click", async () => {
  try {
    const data = {
      nombre: document.querySelector("#nombre").value,
      idcat: document.querySelector("#idcat").value,
    };
    document.querySelector("#imagen").value &&
      (data.imagen = document.querySelector("#imagen").value);
    document.querySelector("#precio").value &&
      (data.precio = document.querySelector("#precio").value);
    document.querySelector("#stock").value &&
      (data.stock = document.querySelector("#stock").value);
    document.querySelector("#date").value &&
      (data.date = document.querySelector("#date").value);
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/products", opts);
    response = await response.json();
    response.statusCode === 201
      ? alert("Event created!")
      : alert("ERROR: "+response.message);
  } catch (error) {
    alert(error.message);
  }
});
