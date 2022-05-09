const express = require("express");
const app = express();
var cors = require('cors')

app.use(cors())
app.use(express.json())


const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log("Port is ", port);
});
