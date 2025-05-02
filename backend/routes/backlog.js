const express = require('express');

const { getBacklog, postBacklog, putBacklog } = require('../controllers/backlogController');

const backlogRouter = express.Router();

backlogRouter.get('/', getBacklog, async (req, res) => {
    if (req.error) {
        return res.status(500).json({ message: req.error.message });
    } 
    return res.status(200).json(req.backlog);
});

// backlogRouter.post('/', postBacklog, async (req, res) => {
//     if (req.error) {
//         return res.status(500).json({ message: req.error.message });
//     }
//     return res.status(200).json(req.backlog);
// });

// backlogRouter.put('/add-task/:taskId', putBacklog, async (req, res) => {
//     if (req.error) {
//         return res.status(500).json({ message: req.error.message });
//     }
//     return res.status(200).json(req.backlog);
// });

backlogRouter.put('/', putBacklog, async(req, res) => {
    if (req.error) {
        return res.status(500).json({ message: req.error.message });
    }
    return res.status(200).json(req.backlog);
});


module.exports = backlogRouter;