let Express = require("express");
let Mongoclient = require("mongodb").MongoClient;
let cors = require("cors");
const multer = require("multer");
require("dotenv").config();

let app = Express();
app.use(cors());
let password = process.env.RECIPEDB_PASSWORD;
let CONNECTION_STRING = `mongodb+srv://juliamanska:${password}@cluster0.drwiewz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let DATABASENAME = "recipeproject";
let database;

app.listen(5038, () => {
  Mongoclient.connect(CONNECTION_STRING, (error, client) => {
    if (error) {
      console.error("Mongo DB Connection Error:", error);
      return;
    }
    database = client.db(DATABASENAME);
    console.log("Mongo DB Connection Successful");
  });
});
