const { response, request } = require("express");
const Tarea = require("../models/tarea");

const tareasGet = async (req = request, res = response) => {
  const { desde = 0, limite } = req.query;
  const usuario = req.usuario._id;
  const query = { estado: true, usuario: usuario };

  try {
    const [total, tareas] = await Promise.all([
      Tarea.countDocuments(query),
      Tarea.find(query).skip(desde).limit(limite),
    ]);

    res.json({
      total,
      tareas,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const tareasPost = async (req = request, res = response) => {
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const usuario = req.usuario._id;

  //generar la data que vamos a guardar
  const data = {
    nombre,
    descripcion,
    usuario,
  };

  const tarea = new Tarea(data);

  //guardar en la BD
  await tarea.save();

  res.json({
    tarea,
    usuario,
    messaje: "Tarea creado exitosamente",
  });
};

const tareaPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, descripcion, ...resto } = req.body;
  resto.nombre = nombre;
  resto.descripcion = descripcion;

  //buscar el producto en la BD y actualizar
  const tarea = await Tarea.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    mensaje: "Tarea actualizada",
    tarea,
  });
};

const tareaDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const tareaAutenticada = req.tarea;
  const tarea = await Tarea.findById(id);

  if (!tarea.estado) {
    return res.json({
      msg: "El producto ya se encuentra en estado Inactivo.",
    });
  }

  const tareaInactivada = await Tarea.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    mensaje: "Tarea modificada. Se cambio a estado INACTIVA",
    tareaInactivada,
    tareaAutenticada,
  });
};

const tareasCompletadasGet = async (req, res) => {
  const usuario = req.usuario._id;
  try {
    const tareasActivas = await Tarea.find({ estado: true, usuario: usuario });
    const tareasCompletadas = tareasActivas.filter(
      (tarea) => tarea.completada === true
    );

    res.json(tareasCompletadas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas completadas" });
  }
};

const tareasPendientesGet = async (req = request, res = response) => {
  const usuario = req.usuario._id;
  try {
    const tareasActivas = await Tarea.find({ estado: true, usuario: usuario });
    const tareasPendientes = tareasActivas.filter(
      (tarea) => tarea.completada === false
    );

    res.json(tareasPendientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas pendientes" });
  }
};

module.exports = {
  tareasGet,
  tareasPost,
  tareaDelete,
  tareaPut,
  tareasCompletadasGet,
  tareasPendientesGet,
};
