const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");



//obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener usuarios", error: err});
    }
});

// obtener un usuario por su ID
router.get("/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado"});
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener el usuario", error: err });
    }
});

// actualizar un usuario por su ID
router.put("/:id", async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // devuelve el usuario actualizado
        );
        if (!usuarioActualizado) return res.status(404).json({ message: "usuario no encontrado" });
        res.json(usuarioActualizado);
    }catch (err) {
        res.status(400).json({message: "error al actualizar el usuario ", error: err});
    }
});

//eliminar un usuario por su id 
router.delete("/:id",async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id,);
        if (!usuarioEliminado) return res.status(404).json({ message: "usuario no encontrado"});
        res.json({ message: "usuario eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ message: "error al eliminar el usuario", error: err});
    }
}); 

// Crear un usuario
router.post("/", async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(400).json({ message: "Error al crear el usuario ", error: err});
    }
});

module.exports = router;