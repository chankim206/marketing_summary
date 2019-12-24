const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/users", (req, res) => {
  fs.readFile("./data/users.json", (err, json) => {
    let obj = JSON.parse(json);
    res.json(obj);
  });
});

router.get("/logs", (req, res) => {
  fs.readFile("./data/logs.json", (err, json) => {
    let obj = JSON.parse(json);
    res.json(obj);
  });
});

module.exports = router;
