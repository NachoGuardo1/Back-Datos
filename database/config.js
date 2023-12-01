const mongoose = require("mongoose");

const dbConecction = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("BD online");
  } catch (error) {
    throw new Error("Error al conectar BD");
  }
};

module.exports = { dbConecction };
