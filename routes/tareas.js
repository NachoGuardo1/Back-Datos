const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
const {
  tareaDelete,
  tareaPut,
  tareasGet,
  tareasPost,
} = require("../controllers/tareas");
const { nombreTareaExiste, tareaExiste } = require("../helpers/db-validator");

router.get("/", tareasGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio.").notEmpty(),
    check("nombre").custom(nombreTareaExiste),
    check("descripcion", "La descripcion es obligatoria.").notEmpty(),
    validarCampos,
  ],
  tareasPost
);

router.delete(
  "/:id",
  [
    check("id", "El Id no es válido").isMongoId(),
    check("id").custom(tareaExiste),
    validarCampos,
  ],
  tareaDelete
);

router.put("/:id", [check("id", "No es un ID válido").isMongoId()], tareaPut);

module.exports = router;
