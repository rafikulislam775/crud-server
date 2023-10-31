const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5001;
const { MongoClient, ServerApiVersion } = require("mongodb");
//middleware
app.use(cors());
app.use(express.json());
//crud-project
//r72sxwxy8ekiAxET
//added mongodb

const uri =
  "mongodb+srv://crud-project:r72sxwxy8ekiAxET@cluster0.2dwjsqx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    //add users input on the server like post method
    const userInputCollection = client
      .db("userInputDB")
      .collection("userInput");

    //post or create data or client to send data to the server and send database
    app.post("/userInput", async (req, res) => {
      const userInput = req.body;
      const result = await userInputCollection.insertOne(userInput);
      res.send(result);
      console.log(result);
    });
    //read data to database or get data
    app.get("/userInput", async (req, res) => {
      const result = await userInputCollection.find().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running");
});
app.listen(port, () => {
  console.log(`CRUD  is running on port ${port}`);
});