/* 
 * Larissa
 * Lägger in en ny kurs i databasen
 */

const sqlite3 = require('sqlite3');
const dbpath = './database/mycv.db';
var express = require('express');
var router = express.Router();

router.post("/course", (req, res) =>
{
    let code = req.body.code;
    let name = req.body.name;
    let syllabus = req.body.syllabus;
    let level = req.body.level;
    let credits = req.body.credits;

    if (!code || !name || !syllabus) {
        res.render('error', {title: "Error", message: "Tomma fält får inte förekomma!"});
    } else
    {
        let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return res.status(404).render('error', {title: "Error", message: err.message});
            } else {
                db.run('INSERT INTO courses(code, name, syllabus, level, credits) VALUES(?, ?, ?, ?, ?)', [code, name, syllabus, level, credits], (err) => {
                    if (err) {
                        res.render('error', {title: "Error", message: err.message});
                    } else
                    {
                        res.render('error', {title: "Meddelande från Servern", message: "Kursen har sparats i databasen."});
                    }
                });
            }
        });
        db.close();
    }
});

module.exports = router;