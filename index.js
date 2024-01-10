require("dotenv").config();
const ticketRoute = require("./routes/ticket");
//const messageRoute = require("./utils/messages");
const express = require('express');
const app = express();
const cors = require("cors");
const { MONGO_URL, PORT } = process.env;
const Ticket = require("./models/Ticket");

const http = require('http');
const socketIo = require('socket.io');
const {
  userJoin,
  getCurrentUser,
  userLeave,
} = require('./utils/users');

const server = http.createServer(app);
const io = socketIo(server);

// run when client connects
io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, ticket, userType }) => {
    const user = userJoin(socket.id, username, ticket, userType);
    socket.join(user.room);
    Ticket.findById(user.room).then((ticket)=>socket.emit('previousChat', ticket.messages))
    .catch((err)=>console.log(err))
  });

  // listen for chatMessage
  socket.on('chatMessage', ({content}) => {
    const user = getCurrentUser(socket.id);
    const id = user.room, sentBy=user.userType
    Ticket.findByIdAndUpdate(id, {$push:{messages:{content, sentBy}}}, {new: true, runValidators: true,})
    .then((newTicket)=>{console.log(newTicket)})
    .catch((err)=>console.log(err))
    const date=new Date();
    io.to(user.room).emit('message', {content, date});
  });

  // runs when clients disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
  });
});

// Connection to MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  }),
);

app.use("/ticket", ticketRoute);
//app.use("/messages", messageRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});