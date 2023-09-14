const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
} = require("../controllers/usuarios");
const router = Router();

router.get("/", usuariosGet);
router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").notEmpty(),
    check("correo", "No es un correo valido").isEmail(),
    check(
      "password",
      "La contraseña debe contester un minimo de 6 caracteres"
    ).isLength({ min: 6 }),
    check("rol", "El rol no es valido").isIn(["USER", "ADMIN"]),
  ],
  usuarioPost
);
router.put("/:id", usuarioPut);
router.delete("/:id", usuarioDelete);

module.exports = router;
