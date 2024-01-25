const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  correoExiste,
  validarPass,
  usuarioExiste,
} = require("../helpers/db-validator");
const { validarJWT } = require("../helpers/validar-jwt");
const router = Router();

router.get("/", usuariosGet);
router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").notEmpty(),
    check("apellido", "el apellido es obligatorio").notEmpty(),
    check("correo").custom(correoExiste),
    check("password").custom(validarPass),
    validarCampos,
  ],

  usuarioPost
);
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos,
  ],
  usuarioPut
);
router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "El Id no es válido").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos,
  ],
  usuarioDelete
);

module.exports = router;
