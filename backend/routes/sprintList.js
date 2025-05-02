const { getSprintList, putSprintList } = require('../controllers/sprintListController');
const express = require('express');
const sprintListRouter = express.Router();

sprintListRouter.get('/', getSprintList, async (req, res) => {
    if (req.error) {
        return res.status(500).json({ message: req.error.message });
    } 
    return res.status(200).json(req.sprintList);
});

sprintListRouter.put('/', putSprintList, async (req, res) => {
    if (req.error) {
        return res.status(500).json({ message: req.error.message });
    }
    return res.status(200).json(req.sprintList);
});

module.exports = sprintListRouter;