const sprintListModel = require('../models/SprintList');

const getSprintList = async (req, res, next) => {
    try {
        // const sprintList = await sprintListModel.findOne();
        // if (!sprintList) {
        //     const newSprintList = await sprintListModel.create({ sprints: [] });
        //     req.sprints = { sprints: newSprintList.sprints };
        // } else {
        //     req.sprints = { sprints: sprintList.sprints };
        // }

        const sprintList = await sprintListModel.findOneAndUpdate(
            {}, // No hay filtro, estamos buscando el primer documento
            { $setOnInsert: { sprints: [] } }, // Si no existe, creamos la lista de sprints con sprints vacios
            { new: true, upsert: true } // Si no existe, lo crea; si existe, lo actualiza
        )

        req.sprintList = { sprints: sprintList.sprints };
    } catch (error) {
        req.error = error;
    }
    next();
}

const putSprintList = async (req, res, next) => {
    const { sprints } = req.body;
    try {
        // const sprintList = await sprintListModel.findOne();
        // if (!sprintList || sprintList.sprints.length === 0) {
        //     const newSprintList = await sprintListModel.create({ sprints });
        //     req.sprintList = { sprints: newSprintList.sprints };
        // }else{
        //     sprintList.sprints = sprints;
        //     await sprintList.save();
        //     req.sprintList = { sprints };
        // }

        const sprintList = await sprintListModel.findOneAndUpdate(
            {}, // No hay filtro, estamos buscando el primer documento
            { $set: { sprints } }, // Actualizamos los sprints
            { upsert: true, new: true } // Si no existe, lo crea; si existe, lo actualiza
        );

        req.sprintList = { sprints: sprintList.sprints };
    } catch (error) {
        req.error = error;
    }

    next();
}

module.exports = {
    getSprintList,
    putSprintList
}