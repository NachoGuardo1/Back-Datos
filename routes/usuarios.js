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
  passRegex,
  validarPass,
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
router.put("/:id", usuarioPut);
router.delete("/:id", usuarioDelete);

module.exports = router;
