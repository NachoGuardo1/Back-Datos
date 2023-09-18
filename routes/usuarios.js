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
  RolValido,
  validarPass,
  usuarioExiste,
} = require("../helpers/db-validator");
const router = Router();

router.get("/", usuariosGet);
router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").notEmpty(),
    check("correo").custom(correoExiste),
    check("password").custom(validarPass),
    check("rol").custom(RolValido),
    validarCampos,
  ],

  usuarioPost
);
router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(usuarioExiste),
    check("rol").custom(RolValido),
    validarCampos,
  ],
  usuarioPut
);
router.delete("/:id", usuarioDelete);

module.exports = router;
