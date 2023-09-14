const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  const datos = req.query;
  res.json({
    mensaje: "Get usuarios",
    datos,
  });
};

const usuarioPost = async (req = request, res = response) => {
  //recibir body desde front
  const datos = req.body;
  const { nombre, correo, password, rol } = datos;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //encriptar contraseña
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  usuario.password = hash;
  //guardar en la BD
  await usuario.save();

  res.json({
    usuario,
    message: "Usuario creado correctamente",
  });
};

const usuarioPut = (req = request, res = response) => {
  res.json({ mensaje: "Put usuario" });
};

const usuarioDelete = (req = request, res = response) => {
  res.json({ mensaje: "Delete usuario" });
};

module.exports = { usuarioDelete, usuarioPost, usuarioPut, usuariosGet };
