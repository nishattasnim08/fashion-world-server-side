const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const app = express();
var cors = require('cors')

app.use(cors())
app.use(express.json())


const port = process.env.PORT || 5000;





const uri = "mongodb+srv://fashiondbadmin:6y9Y6mEtWELpDwF7@cluster0.b0l5u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    console.log('CONNECTED');
  // perform actions on the collection object
  client.close();
});




app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log("Port is ", port);
});
