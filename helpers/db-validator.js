const Usuario = require("../models/usuario");
const Tarea = require("../models/tarea");

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

  if (!existeUsuario) {
    throw new Error(`El id ${id} no corresponde a ningun usuario`);
  }
};

const nombreTareaExiste = async (nombre) => {
  const existeTarea = await Tarea.findOne({ nombre });
  if (existeTarea) {
    throw new Error(
      `El nombre de la tarea ${nombre} ya se encuentra registrado.`
    );
  }
};
const tareaExiste = async (id) => {
  const existeTarea = await Tarea.findById(id);
  if (!existeTarea) {
    throw new Error(`El id ${id} no corresponde a ninguna tarea registrado.}`);
  }
};

module.exports = {
  correoExiste,
  validarPass,
  usuarioExiste,
  nombreTareaExiste,
  tareaExiste,
};
