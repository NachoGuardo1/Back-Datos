const { Schema, model } = require("mongoose");

const TareasSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la tarea es obligatorio"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  descripcion: {
    type: String,
    required: [true, "La descripcion es obligatoria"],
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaVencimiento: {
    type: Date,
  },
  completada: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Tareas", TareasSchema);
