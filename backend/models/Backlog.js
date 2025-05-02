const mongoose = require("mongoose");
const taskSchema = require("./Task");

const backlogSchema = new mongoose.Schema({
    tareas: [taskSchema],
});

module.exports = mongoose.model("Backlog", backlogSchema);