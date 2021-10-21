const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const api = require("./routes/export")
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("./helpers/fsUtils");

const PORT = process.env.port || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static("public"));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  })

app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
  })



app.get("*",(req, res)=>{
    res.sendFile(path.join(__dirname,"/public/index.html"))
  }) 

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}/ 🚀`)
  );