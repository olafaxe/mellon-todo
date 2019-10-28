const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const port = process.env.PORT || 3001;
const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db;

client.connect(function(err) {
  if (err) throw err;
  //users is the name of the collection from the db document
  db = client.db("mellontodo");
});

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());

app.get("/api/getRequest", (req, res) => {
  const todoCollection = db.collection("todos");
  todoCollection.find({}).toArray(function(err, todo) {
    res.send(todo);
  });
});

app.post("/api/postRequest", (req, res) => {
  const todo = req.body;
  const todoCollection = db.collection("todos");
  todoCollection.insertMany([todo]);
});

app.patch("/api/patchRequest", (req, res) => {
  //patch
  const todo = req.body;
  const todoCollection = db.collection("todos");
  todoCollection.replaceOne(
    { id: todo.id },
    {
      id: todo.id,
      filter: todo.filter,
      checked: todo.checked,
      edit: todo.edit,
      delete: todo.delete,
      content: todo.content
    }
  );
  console.log(req.body);
  console.log("edit");
});

app.delete("/api/deleteRequest", (req, res) => {
  //get
  const todo = req.body;
  const todoCollection = db.collection("todos");
  todoCollection.deleteMany({ id: todo.id });
  console.log("delete");
  console.log(todo);
  console.log(todo.id);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
