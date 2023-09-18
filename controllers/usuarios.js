const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { desde, limite } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(desde).limit(limite),
  ]);

  res.json({
    mensaje: "Get usuarios",
    total,
    usuarios,
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

const usuarioPut = async (req = request, res = response) => {
  const { id } = req.params;

  //obtener datos para actualizar
  const { password, correo, ...resto } = req.body;
  //cifrar password
  const salt = bcrypt.genSaltSync(10);
  resto.password = bcrypt.hashSync(password, salt);

  //buscar y actualizar usuario
  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({ mensaje: "Usuario actualizado", usuario });
};

const usuarioDelete = async (req = request, res = response) => {
  const { _id } = req.params;
  const usuarioAutenticado = req.usuario;
  //cambiamos el estado
  const usuario = await Usuario.findById(_id);
  if (!usuario.estado) {
    return res.json({
      msg: "El usuario ya se encuentra inactivo",
    });
  }

  const usuarioInactivado = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json({
    mensaje: "Usuario modificado. Se cambio a estado INACTIVO",
    usuarioInactivado,
    usuarioAutenticado,
  });
};

module.exports = { usuarioDelete, usuarioPost, usuarioPut, usuariosGet };
