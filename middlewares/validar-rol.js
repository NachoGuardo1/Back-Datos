const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    //no validamos el token antes
    return res.status(500).json({
      msg: "Se quire validar el rol sin validar el token",
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN") {
    return res.status(401).json({
      msg: `${nombre} no es administrador`,
    });
  }

  next();
};

module.exports = {
  esAdminRole,
};
