const Rol = require("../models/rol");
const Usuario = require("../models/usuario");

//validacion rol
const RolValido = async (rol) => {
  const existeRol = await Rol.findOne({ rol });

  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe en la BD`);
  }
};

//validacion correo
const correoExiste = async (correo) => {
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error(`El correo ${correo} ya se encuentra registrado`);
  }
};

//validacion pass
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,10}$/;
const validarPass = async (password) => {
  if (!passRegex.test(password)) {
    throw new Error(`La contraseña no cumple con los requisitos de seguridad`);
  }
};

//validacion usuario
const usuarioExiste = async (id) => {
  const existeUsuario = await Usuario.findById(id);

  if (!usuario) {
    throw new Error(`El id ${id} no corresponde a ningun usuario`);
  }
};

module.exports = { correoExiste, RolValido, validarPass, usuarioExiste };
