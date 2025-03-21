/* 
 * Larissa
 * Raderar en kurs i databasen.
 */

const sqlite3 = require('sqlite3');
const dbpath = './database/mycv.db';
var express = require('express');
var router = express.Router();

router.get('/:id', function (req, res, next) {
    let courseid = req.params.id;
    if (!courseid)
    {
        res.render('error', {title: "Error", message: "Kursens ID måste anges!"});
    } else
    {
        let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE, (err) => {
            if (err)
            {
                return res.status(404).render('error', {title: "Error", message: err.message});
            } else {
                db.run("DELETE FROM courses WHERE id = ?", [courseid], (err) => {
                    if (err)
                    {
                        res.render('error', {title: "Error", message: err.message});
                    } else
                    {
                        // Uppdaterar visningen av samtliga kurser i en tabell;
                        res.redirect('/display/all');
                    }
                });
            }
            db.close();
        });
    }
});

module.exports = router;