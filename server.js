const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const port = process.env.PORT || 5000;
const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db;

client.connect(function(err) {
  if (err) throw err;
  db = client.db("heroku_24b4q4wg");
});

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  const todoCollection = db.collection("todos");
  todoCollection.find({}).toArray(function(err, todo) {
    res.send(todo);
  });
});

app.get("/filters", (req, res) => {
  const filterCollection = db.collection("filters");
  filterCollection.find({}).toArray((err, filter) => {
    res.send(filter);
  });
});

app.post("/todos", (req, res) => {
  const todo = req.body;
  const todoCollection = db.collection("todos");
  todoCollection.insertMany([todo]).then(() => res.send(todo));
});

app.post("/filters", (req, res) => {
  const filter = req.body;
  const filterCollection = db.collection("filters");
  filterCollection.insertMany([filter]).then(() => res.send(filter));
});

app.put("/todos/:id", (req, res) => {
  //put
  const todo = req.body;
  const todoCollection = db.collection("todos");
  todoCollection
    .replaceOne(
      { id: Number(req.params.id) },
      {
        id: todo.id,
        filter: todo.filter,
        checked: todo.checked,
        edit: todo.edit,
        delete: todo.delete,
        content: todo.content,
        date: todo.date
      }
    )
    .then(() => res.send(todo));
});

app.patch("/todos/:id", (req, res) => {
  const checked = req.body.checked;
  const todoCollection = db.collection("todos");
  todoCollection
    .update(
      { id: Number(req.params.id) },
      {
        $set: {
          checked: checked
        }
      }
    )
    .then(() => res.send(checked));
});

app.delete("/todos/:id", (req, res) => {
  const todoCollection = db.collection("todos");
  todoCollection
    .deleteMany({ id: Number(req.params.id) })
    .then(() => res.send(req.params.id));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
