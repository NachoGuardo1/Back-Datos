const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const datos = req.query;
  res.json({
    mensaje: "Get usuarios",
    datos,
  });
};

const usuarioPost = (req = request, res = response) => {
  const { nombre, correo } = req.body;
  res.json({
    mensaje: "Post usuario",
    nombre,
    correo,
  });
};

const usuarioPut = (req = request, res = response) => {
  res.json({ mensaje: "Put usuario" });
};

const usuarioDelete = (req = request, res = response) => {
  res.json({ mensaje: "Delete usuario" });
};

module.exports = { usuarioDelete, usuarioPost, usuarioPut, usuariosGet };
