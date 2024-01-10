const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

// get all messages of a ticket
router.get("/", async (req, res, next) => {
    try {
        const { id } = req.query;
        const ticket = await Ticket.findById(id);
        if(!ticket)
            return res.status(404).json({ error: "Ticket not found" });
        res.status(201).json(ticket.messages);
    } catch (err) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
});

// send messages for a ticket
router.post("/", async (req, res, next) => {
    try {
        const {content, sentBy} = req.body;
        const {id} = req.query;
        const newMessage = await Ticket.findByIdAndUpdate(id, {$push:{messages:{content,sentBy}}}, {new: true, runValidators: true,});
        io.emit('message', req.body);
        res.status(200).json(newMessage);
    } catch (err) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
});

module.exports = router;