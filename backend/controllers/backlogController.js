const backlogModel = require('../models/Backlog.js');

// const postBacklog = async(req, res, next) => {
//     const {tareas} = req?.body;
    
//     try {
//         const backlogs = await backlogModel.find();
//         if (backlogs.length === 0) {
//             await backlogModel.create({tareas});
//             req.backlog = {tareas};
//         }
//     } catch (error) {
//         return req.error = error; 
//     }
    
//     next();
// }

// const putBacklog = async(req, res, next) => {
//     const { taskId } = req.params;
//     const {titulo, descripcion, estado, fechaLimite, color} = req?.body;
//     try {
//         const backlog = await backlogModel.find();
//         if (!backlog) {
//             throw new Error('No se encontraron backlogs');
//         }
//         const task = backlog.tareas.find(task => task._id.toString() === taskId);
//         if (task) {
//             if (!titulo || !estado || !fechaLimite) {
//                 throw new Error('Los campos titulo, estado y fecha son obligatorios');
//             }
//             const newTask = {
//                 titulo,
//                 descripcion,
//                 estado,
//                 fechaLimite,
//                 color
//             };
//             const updatedBacklog = {...backlog, tareas: backlog.tareas.map(task => (task._id.toString() === taskId ? newTask : task))};
//             await backlogModel.updateOne({_id: backlog._id}, updatedBacklog);
//             req.backlog = updatedBacklog;
//         } else {
//             const newTask = { _id: taskId, titulo, descripcion, estado, fechaLimite, color };
//             const updatedBacklog = {...backlog, tareas: [...backlog.tareas, newTask]};
//             await backlogModel.updateOne({ _id: backlog._id }, updatedBacklog);
//             req.backlog = updatedBacklog;
//         }
//     } catch (error) {
//         req.error = error;
//     } 

//     next();
// }

const getBacklog = async(req, res, next) =>{
    try {
        // const backlog = await backlogModel.findOne(); // Al no pasarle un filtro, devuelve el primer objeto por defecto (en nuestro caso, solo existe un backlog)
        // if (!backlog) {
        //     const newBacklog = await backlogModel.create({tareas: []});
        //     req.backlog = {tareas: newBacklog.tareas};
        // } else {
        //     req.backlog = { tareas: backlog.tareas };
        // }
        const backlog = await backlogModel.findOneAndUpdate(
            {}, // No hay filtro, estamos buscando el primer documento.
            { $setOnInsert: { tareas: [] } }, // Si no existe, creamos el backlog con tareas vacías.
            { new: true, upsert: true } // Si no existe, lo crea; si existe, no hace nada, y retorna el documento actualizado.
        );

        req.backlog = { tareas: backlog.tareas };
    } catch (error) {
        req.error = error;  
    }
    next();
}

const putBacklog = async(req, res, next) => {
    const {tareas} = req.body;
    try {
        // const backlog = await backlogModel.findOne();
        // if (!backlog || backlog.tareas.length === 0) {
        //     const newBacklog = await backlogModel.create({tareas});
        //     req.backlog = {tareas: newBacklog.tareas};
        // }else{
        //     backlog.tareas = tareas;
        //     await backlog.save(); // Detecta que el objeto ya existe (tiene un _id) y entonces actualiza los datos en MongoDB.
        //     req.backlog = {tareas};
        // }

        const backlog = await backlogModel.findOneAndUpdate(
            {}, // No hay filtro, estamos buscando el primer documento
            { $set: { tareas } }, // Actualizamos las tareas
            { upsert: true, new: true } // Si no existe, lo crea; si existe, lo actualiza
        );

        req.backlog = { tareas: backlog.tareas };
    } catch (error) {
        req.error = error;
    } 

    next();
}

module.exports = {
    getBacklog, 
    // postBacklog,
    putBacklog
}