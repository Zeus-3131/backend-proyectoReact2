import fs from "fs";
import crypto from "crypto";

class UsersManager {
  constructor(path) {
    this.path = path;
    this.users = [];
    this.Photouser = "../../../public/user.png"; // Ruta de la imagen predeterminada
    this.init();
  }

  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }

  async createUser(data) {
    try {
      const { username, email, password, photo } = data;

      if (!username || !email || !password) {
        throw new Error("Los campos 'username', 'email' y 'password' son obligatorios");
      }

      const trimmedUsername = username.trim();
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      const userPhoto = photo || this.Photouser; // Utiliza la foto proporcionada o la predeterminada

      if (trimmedUsername === '' || trimmedEmail === '' || trimmedPassword === '') {
        throw new Error("Los campos 'username', 'email' y 'password' no pueden estar vacíos");
      }

      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        photo: userPhoto,
        username: trimmedUsername,
        email: trimmedEmail,
        password: trimmedPassword,
        role: data.role || "user",
      };

      this.users.push(user);
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);

      console.log("Usuario creado con id: " + user.id);
      return user.id;
    } catch (error) {
      throw error;
    }
  }

  readUsers() {
    try {
      if (this.users.length === 0) {
        throw new Error("¡No hay usuarios!");
      } else {
        console.log(this.users);
        return this.users;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readUserById(id) {
    try {
      const one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay ningún usuario con id=" + id);
      } else {
        console.log("Leer " + JSON.stringify(one));
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async updateUser(userId, updatedData) {
    try {
      const userIndex = this.users.findIndex((user) => user.id === userId);
  
      if (userIndex === -1) {
        return "No se encontró ningún usuario con ese ID";
      }
  
      const { username, email, password } = updatedData;
  
      const trimmedUsername = username ? username.trim() : this.users[userIndex].username;
      const trimmedEmail = email ? email.trim() : this.users[userIndex].email;
      const trimmedPassword = password ? password.trim() : this.users[userIndex].password;
  
      const updatedUser = {
        ...this.users[userIndex],
        username: trimmedUsername,
        email: trimmedEmail,
        password: trimmedPassword,
      };
  
      this.users[userIndex] = updatedUser;
  
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
  
      return "Usuario actualizado exitosamente";
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroyUserById(id) {
    try {
      let one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay ningún usuario con id=" + id);
      } else {
        this.users = this.users.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.users, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("Usuario eliminado con id: " + id);
        return id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const users = new UsersManager("./src/data/fs/files/users.json");
export default users;
