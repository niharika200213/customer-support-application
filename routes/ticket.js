const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

// Create a new ticket
router.post("/create", async (req, res, next) => {
    try {
        const { description, createdBy } = req.body;
        const newTicket = await Ticket.create({
            description:description,
            createdBy:createdBy,
            messages:[{content:description}]
        });

        res.status(201).json(newTicket);
    } catch (err) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
});

// get tickets by createdBy
router.get("/user/:createdBy", async (req, res, next) => {
    try {
        const createdBy = req.params.createdBy;
        const userTickets = await Ticket.find({ createdBy: createdBy });
        res.status(200).json(userTickets);
    } catch (err) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
});

//searching
router.get("/search", async (req,res,next) => {
    try{
        const {exp} = req.query;
        const tickets = await Ticket.find({$or:
            [{description:{$regex: `${exp}`, $options: 'i'}},
            {createdBy:{$regex: `${exp}`, $options: 'i'}},
            {messages:{$elemMatch:{content:{$regex: `${exp}`, $options: 'i'}}}},]
            });
        return res.status(200).send(tickets);
    }catch(err){
        if(!err.statusCode)
            err.statusCode=500;
        next(err);
    }
});

// Fetching a Single Ticket:
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.status(200).json(ticket);
    } catch (err) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
});

// Updating a Ticket:
router.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const status = req.body; // Data to update the ticket

        const updatedTicket = await Ticket.findByIdAndUpdate(id, status, {
            new: true, runValidators: true,
        });
        if (!updatedTicket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.status(200).json(updatedTicket);
    } catch (err) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
});

// Deleting a Ticket:

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedTicket = await Ticket.findByIdAndDelete(id);
        if (!deletedTicket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.status(204).end(); // No content, successful deletion
    } catch (err) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
});

// Get a list of all tickets
router.get("/", async (req, res, next) => {
    try {
        const { status } = req.query;

        // Check if a status filter is provided
        const filter = status ? { status:{$regex:status, $options:'i'}} : {};

        const tickets = await Ticket.find(filter);
        res.status(200).json(tickets);
    } catch (err) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
});

module.exports = router;