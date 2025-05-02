const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String},
    estado: {type: String, enum: ['pendiente', 'en progreso', 'completado'], required: true},
    fechaLimite: {type: String, required: true},
    // color: {type: String}
});

module.exports = taskSchema;