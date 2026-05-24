const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const todoRoutes = require("./routes/todo.routes");
const connectDB = require("./lib/mongodb");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());

app.use("/todo", todoRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
