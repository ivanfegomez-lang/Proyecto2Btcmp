const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }, 
    contraseña: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ["admin", "usuario"],
        default: "usuario"
    }
}, {
    timestamps: true //crea automaticamente createdAt y updatedAt
});

module.exports = mongoose.model("Usuario", usuarioSchema);