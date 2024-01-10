const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "Pending", "Resolved"],
    default: "Open",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
  messages: [
    {
      sentBy: {
        type: String,
        enum: ["User", "Staff"],
        default: "User"
      },
      content: {
        type: String,
        required: true
      },
      sentAt: {
        type: Date,
        default: Date.now,
      }
    }
  ]
});

module.exports = mongoose.model("Ticket", ticketSchema);