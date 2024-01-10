require("dotenv").config();
const ticketRoute=require("./routes/ticket");
const express=require('express');
const cors=require("cors");

const { MONGO_URL, PORT } = process.env;

// Connection to MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  }),
);

app.use("/api/ticket", ticketRoute);

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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});