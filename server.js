const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());

app.get("/api/getRequest", (req, res) => {
  //API logic
});

app.post("/api/postRequest", (req, res) => {
  //API logic
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
