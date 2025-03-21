/* 
 * Larissa
 * För visning öppnas databasen i Read ony-läget
 */
const sqlite3 = require('sqlite3');
const dbpath = './database/mycv.db';
var express = require('express');
var router = express.Router();
var message = '';

router.get('/all', function (req, res, next) {
    // För visning öppnas databasen i Read ony-läget
    let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            return res.status(404).render('error', {title: "Error", message: err.message});
        } else {
            message = 'Uppkopplad till databasen.';
            db.serialize(function () {
                db.all("SELECT * FROM courses", function (err, courses) {
                    if (err)
                        res.render('error', {title: "Error", message: err.message});
                    else
                    {
                        res.render('display', {title: "Mina kurser", message: message, courses: courses});
                    }
                });
            });
        }
        db.close();
    });
});

module.exports = router;

