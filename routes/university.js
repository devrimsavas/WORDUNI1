var express = require("express");
var router = express.Router();
//add path
var path = require("path");
//we use csv-parser
var csv = require("csv-parser");

//add file
var fs = require("fs");

router.get("/", function (req, res, next) {
  res.render("university", { title: "University" });
});

//show all universities ranking
//this route reads a csv file and returns its content to JSON 

router.get("/getuniversities", (req, res) => {

  //define an empty space
  const results = [];
  const filePath = path.join(__dirname, "..", "Data", "cwurData.csv");

  //createREADSTREAM 
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.json(results);
    })
    .on("error", (err) => {
      res.status(500).json({ error: "failed to read csv file" });
    });
});

module.exports = router;
