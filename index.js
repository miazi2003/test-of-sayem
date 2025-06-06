const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//user : simpleDBUser
//pass: SBdLDdOMyecCA1Kr

const uri =
  "mongodb+srv://simpleDBUser:SBdLDdOMyecCA1Kr@cluster0.3crt5al.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    // const database = client.db('users');
    // const usersCollection = database.collection('users')

    // app.post('/users' , async (req,res)=>{
    //     console.log('data in the server' ,  req.body)
    //     const newUser = req.body
    //     const result = await usersCollection.insertOne(newUser)
    //     res.send(result)

    // })

    const database = client.db("users");
    const userCollection = database.collection("users");

    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      console.log("data in the server", req.body);
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);

      res.send(result);
    });

    app.delete("/users/:id", async(req, res) => {
      const id = req.params.id;
      console.log("to be deleted : ", id);
      const query ={_id : new ObjectId(id)}
      const result = await userCollection.deleteOne(query)
      res.send(result)
    });





     app.delete("/users/:id", async(req, res) => {
      const id = req.params.id;
      console.log("to be deleted : ", id);
      const query ={_id : new ObjectId(id)}
      const result = await userCollection.deleteOne(query)
      res.send(result)
    });

    await client.db("admin").command({ ping: 1 });
    console.log("pinged your deployment");
  } catch {}
}

run().catch(console.log);

app.get("/", (req, res) => {
  res.send("server running on");
});

app.listen(port, () => {
  console.log("port running on : ", port);
});
