// importamos las dependencias
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// configuraciones iniciales 
dotenv.config(); // carga las variables del archivo .env
const app = express ();
const PORT = process.env.PORT || 3000;

 // middlewares
 
 app.use(cors());
 app.use(express.json());

 // importar las rutas
 const usuarioRoutes = require("./routes/usuarioRoutes");

 //usar las rutas
 app.use("/api/usuarios", usuarioRoutes);

 //Endpoint de prueba
 app.get("/", (req, res) => {
    res.send("servidor funcionando correctamente.");
 });

 //coneccion  mongodb
 mongoose
    .connect(process.env.MONGO_URI)
    .then (() => {
        console.log("Conectado a mongobd");
        app.listen(PORT,() => console.log(`servidor corriendo en el puerto ` + PORT));
    })
    .catch ((err) => console.error("error al conectar con mongobd", err));
