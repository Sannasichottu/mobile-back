import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config()
const app = express();

const PORT = process.env.PORT;



const MONGO_URL = process.env.MONGO_URL

async function createConnection(){
    const client = new MongoClient(MONGO_URL)
    await client.connect();
    console.log("Mongodb is connected")
    return client;
} 

const client = await createConnection()

app.use(cors());
app.use(express.json());

app.get("/", function(req, res) {
    res.send("Hello Everyone");
});

/* --- mobiles --- */
app.get("/mobiles", async function(req, res) {
    //db.mobiles.find({})
    const mobiles = await client.db("ecommerce")
    .collection("mobiles")
    .find({})
    .toArray();


    res.send(mobiles);
});

/* --- post --- */
app.post("/mobiles", async function(req, res) {
    const data = req.body
    //db.mobiles.insertMany(data)
    console.log(data);
    const result = await client.db("ecommerce").collection("mobiles").insertMany(data)
    res.send(result);
});

app.listen(PORT, () => console.log("App started in 😊", PORT))
