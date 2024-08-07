//Youtube Channel = https://www.youtube.com/watch?v=rY8DJ5EZzZo

require("dotenv").config();
const express = require("express");
const app = express();
require("./connection/connection");
const cors = require("cors");
const userAPI = require("./routes/user");
const taskAPI = require("./routes/task");
app.use(cors());
//need to define in which format you want to send data
app.use(express.json());
//it means when hit on "localhost:1000/api/v1/sign-in" then it run
app.use("/api/v1", userAPI);
app.use("/api/v2", taskAPI);

app.use("/", (req, res) => {
  res.send("Hello from backend side");
});
const PORT = 1000;
app.listen(PORT, () => {
  console.log("Server started");
});
