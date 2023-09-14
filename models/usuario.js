const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: { type: String, required: [true, "el nombre es obligatorio"] },
  correo: {
    type: String,
    required: [true, "el correo es obligatorio"],
    unique: true,
  },
  password: { type: String, required: [true, "la contraseña es obligatoria"] },
  rol: { type: String, required: true },
  estado: { type: Boolean, default: true },
});

//quitar datos extras
UsuarioSchema.methods.toJSON = function () {
  //desestructuramos los datos
  const { __v, contrasena, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
