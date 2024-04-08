import fs from "fs";
import crypto from "crypto";

class EventsManager {
  #ivaRate = 0.19; // Variable para el IVA en Colombia

  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.events = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }

  constructor(path) {
    this.path = path;
    this.events = [];
    this.init();
  }

  async createEvent(data) {
    try {
        if (!data.nombre || data.nombre.trim() === '') { 
            throw new Error("El nombre es requerido");
        }

        const event = {
            id: crypto.randomBytes(12).toString("hex"),
            nombre: data.nombre,
            imagen: data.imagen || "https://i.postimg.cc/HxdvTwqJ/events.jpg",
            precio: data.precio || 300000,
            stock: data.stock || 50,
            idcat: crypto.randomBytes(12).toString("hex"),
            date: data.date || new Date(),
        };

        this.events.push(event);
        const jsonData = JSON.stringify(this.events, null, 2);
        await fs.promises.writeFile(this.path, jsonData);

        console.log("Evento creado con id: " + event.id);
        return event.id;
    } catch (error) {
        throw error;
    }
}

  readEvents() {
    try {
      if (this.events.length === 0) {
        throw new Error("¡No hay eventos!");
      } else {
        console.log(this.events);
        return this.events;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readEventById(id) {
    try {
      const one = this.events.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay ningún evento con id=" + id);
      } else {
        console.log("Leer " + JSON.stringify(one));
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async removeEventById(id) {
    try {
      let one = this.events.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay ningún evento con id=" + id);
      } else {
        this.events = this.events.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.events, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("Eliminado " + id);
        return id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async soldticket(quantity, eid) {
    try {
      const one = this.readEventById(eid);
      if (one) {
        if (one.stock >= quantity) {
          one.stock = one.stock - quantity;
          const subtotal = one.precio * quantity;
          const ivaAmount = subtotal * this.#ivaRate;
          const totalAmount = subtotal + ivaAmount;
  
          const jsonData = JSON.stringify(this.events, null, 2);
          await fs.promises.writeFile(this.path, jsonData);
  
          console.log(`Producto vendido. Stock disponible: ${one.stock}`);
          console.log(`Subtotal: ${subtotal}`);
          console.log(`IVA (${this.#ivaRate * 100}%): ${ivaAmount}`);
          console.log(`Total: ${totalAmount}`);
  
          return one.stock;
        } else {
          return "No hay suficiente stock en el evento.";
        }
      } else {
        return "No hay ningún evento con id=" + eid;
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

const events = new EventsManager("./src/data/fs/files/events.json");
export default events;
