const params = new URLSearchParams(location.search);
const selector = document.querySelector("#text");
<<<<<<< HEAD
selector.value = params.get("nombre");
document.querySelector("#search").addEventListener("click", async (event) => {
  try {
    const text = selector.value;
    location.search = "nombre=" + text;
=======
selector.value = params.get("title");
document.querySelector("#search").addEventListener("click", async (event) => {
  try {
    const text = selector.value;
    location.search = "title=" + text;
>>>>>>> 7bd71d8b1780526666cd3a2122f4536857a44108
  } catch (error) {
    alert(error.message);
  }
});
