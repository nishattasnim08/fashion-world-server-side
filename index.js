const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require("express");
const app = express();
var cors = require('cors')
require("dotenv").config();

app.use(cors())
app.use(express.json())


const port = process.env.PORT || 5000;





const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.b0l5u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const dressCollection = client.db("fashiondb").collection("dresses");
        // query for dresses that have a runtime less than 15 minutes
        app.get("/dresses", async (req, res) => {

            const query = {};

            const cursor = dressCollection.find(query);
            // replace console.dir with your callback to access individual elements
            const result = await cursor.toArray();
            res.send(result);
        });

        app.post("/dresses", async (req, res) => {
            const newDress = req.body
            const result = await dressCollection.insertOne(newDress);
            res.send(result);
        });

        app.delete("/dress/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await dressCollection.deleteOne(query);
            res.send(result)

        });

        app.get("/dress/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const dress = await dressCollection.findOne(query);
            res.send(dress);
        });

        app.get("/mydress", async (req, res) => {
            const email = req.query.email;
            const query = { sEmail: email };
            const cursor = await dressCollection.find(query);
            const myDress = await cursor.toArray();
            res.send(myDress);
        });

        app.put("/dress/:id", async (req, res) => {
            const id = req.params.id;
            const quantity = req.body.quantity

            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateItem = {

                $set: {
                    quantity
                },

            };
            const result = await dressCollection.updateOne(filter, updateItem, options);
            res.send(result)

        });


    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);




app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(port, () => {
    console.log("Port is ", port);
});
