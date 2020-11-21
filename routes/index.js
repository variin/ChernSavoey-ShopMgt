var express = require('express');
const { storage, db } = require('../model/db');

var router = express.Router();


// Display Menu
router.get("/", async (req, res) => {

      res.render("login");

}
);

module.exports = router;
