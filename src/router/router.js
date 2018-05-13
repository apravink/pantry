const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "it wsorks!" });
  console.log("route hit");
});

module.exports = router;
