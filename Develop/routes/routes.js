const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");
const path = require('path')




router.get("/notes", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
  });
  
router.get("/notes/:id", (req, res) => {
      readFromFile(path.join(__dirname, "./db/db.json"), "utf-8")
        .then((data) => {
          res.json(JSON.parse(data));
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "Unable to read notes." });
        });
    });
  
router.post("/notes", (req, res) => {
      console.log(req.body);
    
      const { title, text } = req.body;
    
      if (req.body) {
        const newNote = {
          title,
          text,
          id: uuidv4(),
        };
    
        readAndAppend(newNote, "../develop/db/db.json");
        res.json("Tip added successfully 🚀");
      } else {
        res.error("Error in adding tip");
      }
    });
  
module.exports = router;