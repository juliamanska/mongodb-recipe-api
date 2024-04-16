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

app.get("/recipeapi/recipeproject/GetRecipes", async (request, response) => {
  try {
    const result = await database
      .collection("recipecollection")
      .find({})
      .toArray();
    response.send(result);
  } catch (error) {
    handleDatabaseError(response, error);
  }
});

app.post(
  "/recipeapi/recipeproject/AddRecipes",
  multer().none(),
  async (request, response) => {
    try {
      const recipe = {
        id: Date.now().toString(),
        name: request.body.name,
        ingredients: request.body.ingredients,
        recipe: request.body.recipe,
      };
      await database.collection("recipecollection").insertOne(recipe);
      response.json("Recipe added successfully");
    } catch (error) {
      handleDatabaseError(response, error);
    }
  }
);

app.delete(
  "/recipeapi/recipeproject/DeleteRecipes",
  async (request, response) => {
    try {
      await database
        .collection("recipecollection")
        .deleteOne({ id: request.query.id });
      response.json("Recipe deleted successfully");
    } catch (error) {
      handleDatabaseError(response, error);
    }
  }
);
