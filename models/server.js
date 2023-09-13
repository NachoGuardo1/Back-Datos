const express = require("express");
const cors = require("cors");
const { dbConecction } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //conectar con BD
    this.conectarDB();
    //midlewares
    this.middlewares();
    //funcion para rutas
    this.routes();
  }

  async conectarDB() {
    await dbConecction();
  }

  middlewares() {
    //cors
    this.app.use(cors({ origin: "*" }));
    //peticiones
    this.app.use(express.json());
    //public
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("server online por:", this.port);
    });
  }
}

module.exports = Server;
