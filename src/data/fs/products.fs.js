// Clase para gestionar los productos
import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  #ivaRate = 0.19; // Tasa de IVA en Colombia

  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }

  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }

  async createProduct(data) {
    try {
      if (!data.nombre || data.nombre.trim() === '') {
        throw new Error("El nombre del producto es requerido");
      }

      const product = {
        id: crypto.randomBytes(12).toString("hex"), 
        nombre: data.nombre,
        imagen: data.imagen || "https://i.postimg.cc/HxdvTwqJ/events.jpg",
        precio: data.precio || 300000,
        stock: data.stock || 50,
        idcat: crypto.randomBytes(12).toString("hex"),
        date: data.date || new Date(),
      };

      this.products.push(product);
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);

      console.log("Producto creado con id: " + product.id);
      return product.id;
    } catch (error) {
      throw error;
    }
  }

  readProducts() { 
    try {
      if (this.products.length === 0) {
        throw new Error("¡No hay productos!");
      } else {
        console.log(this.products);
        return this.products;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readProductById(id) {
    try {
      const one = this.products.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay ningún producto con id=" + id);
      } else {
        console.log("Leer " + JSON.stringify(one));
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroyProductById(id) {
    try {
      let one = this.products.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay ningún producto con id=" + id);
      } else {
        this.products = this.products.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("Producto eliminado con id: " + id);
        return id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async productSold(quantity, pid) {
    try {
      const product = this.readProductById(pid);
      if (product) {
        if (product.stock >= quantity) {
          product.stock = product.stock - quantity;
          const subtotal = product.precio * quantity;
          const ivaAmount = subtotal * this.#ivaRate;
          const totalAmount = subtotal + ivaAmount;

          const jsonData = JSON.stringify(this.products, null, 2);
          await fs.promises.writeFile(this.path, jsonData);

          console.log(`Producto vendido. Stock disponible: ${product.stock}`);
          console.log(`Subtotal: ${subtotal}`);
          console.log(`IVA (${this.#ivaRate * 100}%): ${ivaAmount}`);
          console.log(`Total: ${totalAmount}`);

          return product.stock;
        } else {
          return "No hay suficiente stock del producto.";
        }
      } else {
        return "No hay ningún producto con id=" + pid;
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

const productsManager = new ProductsManager("./src/data/fs/files/products.json");
export default productsManager;
