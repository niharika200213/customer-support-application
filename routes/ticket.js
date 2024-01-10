const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

// Create a new ticket
router.post("/create", async (req, res) => {
    try {
        const { description, status, createdBy } = req.body;
        const newTicket = await Ticket.create({
            description,
            status,
            createdBy,
        });
        res.status(201).json(newTicket);
    } catch (error) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
});

// Get a list of all tickets
router.get("/", async (req, res) => {
    try {
        const { status } = req.query;

        // Check if a status filter is provided
        const filter = status ? { status } : {};

        const tickets = await Ticket.find(filter);
        res.status(200).json(tickets);
    } catch (error) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
});

// get tickets by createdBy
router.get("/user/:createdBy", async (req, res) => {
    try {
        const createdBy = req.params.createdBy;
        const userTickets = await Ticket.find({ createdBy: createdBy });
        res.status(200).json(userTickets);
    } catch (error) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
});

// Fetching a Single Ticket:
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.status(200).json(ticket);
    } catch (error) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
});

// Updating a Ticket:
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; // Data to update the ticket

        const updatedTicket = await Ticket.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!updatedTicket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.status(200).json(updatedTicket);
    } catch (error) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
});

// Deleting a Ticket:

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTicket = await Ticket.findByIdAndDelete(id);
        if (!deletedTicket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.status(204).end(); // No content, successful deletion
    } catch (error) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
});

module.exports = router;