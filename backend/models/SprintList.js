const mongoose = require("mongoose");
const taskSchema = require("./Task");

const sprintSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    fechaInicio: { type: String, required: true },
    fechaCierre: { type: String, required: true },
    tareas: [taskSchema],
    // color: { type: String},
});

// module.exports = mongoose.model("Sprint", sprintSchema);

const sprintListSchema = new mongoose.Schema({
    sprints: { type: [sprintSchema], default: [] },
});

module.exports = mongoose.model("SprintList", sprintListSchema);