const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    //verificar si el correo existe
    if (!usuario) {
      return res.status(400).json({
        msg: "correo o password incorrectos",
      });
    }
    //usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "usuario inactivo",
      });
    }
    //verificar contraseña
    const validPass = bcrypt.compareSync(password, usuario.password);
    if (!validPass) {
      return res.status(400).json({
        msg: "password incorrecto",
      });
    }
    //generar token
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "login OK",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el ADM",
    });
  }
};

module.exports = { login };
