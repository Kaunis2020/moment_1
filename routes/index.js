/* 
 * index.html
 */
var express = require('express');
var router = express.Router();

/* GET home page index.html */
router.get('/', function(req, res, next) {
     res.redirect('./index.html');
});
module.exports = router;
