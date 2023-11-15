const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
const {
  tareaDelete,
  tareaPut,
  tareasGet,
  tareasPost,
  tareasCompletadasGet,
  tareasPendientesGet,
} = require("../controllers/tareas");
const { nombreTareaExiste, tareaExiste } = require("../helpers/db-validator");
const { validarJWT } = require("../helpers/validar-jwt");

router.get("/", validarJWT, tareasGet);

router.get("/completadas", validarJWT, tareasCompletadasGet);

router.get("/pendientes", validarJWT, tareasPendientesGet);

router.post(
  "/",
  [
    validarJWT,
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
