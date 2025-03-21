/* 
 * Larissa
 * Filen uppdaterar kurser i databasen;
 */

const sqlite3 = require('sqlite3');
const dbpath = './database/mycv.db';
var express = require('express');
var router = express.Router();

/* Letar efter kursens id och returnerar sidan "Uppdatera kurs" 
 * med samtliga ifyllda fält. Kursens ID är read only för att
 * hitta kursen i databasen. Kursens ID kan INTE redigeras.
 * */
router.get('/:id', function (req, res, next) {
    let courseid = req.params.id;

    let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            return res.status(404).render('error', {title: "Error", message: err.message});
        } else {
            db.serialize(function () {
                db.all("SELECT * FROM courses WHERE id = ?", [courseid], (err, courses) => {
                    if (err) {
                        res.render('error', {title: "Error", message: err.message});
                    } else
                    {
                        if (courses !== null && courses.length > 0)
                        {
                            res.render('update', {title: "Uppdatera kurs", courses: courses});
                        } else
                        {
                            res.render('error', {title: "Meddelande från Servern", message: "Kursen finns INTE i databasen."});
                        }
                    }
                });
                db.close();
            });
        }
    });
});

// Uppdaterar kurs i databasen
router.post("/course", (req, res) =>
{
    let courseid = req.body.id;
    let code = req.body.code;
    let name = req.body.name;
    let syllabus = req.body.syllabus;
    let level = req.body.level;
    let credits = req.body.credits;

    if (!courseid || !code || !name || !syllabus) {
        res.render('error', {title: "Error", message: "Tomma fält får inte förekomma!"});
    } else
    {
        let db = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return res.status(404).render('error', {title: "Error", message: err.message});
            } else {
                db.serialize(function () {
                    db.all("SELECT * FROM courses WHERE id = ?", [courseid], (err, courses) => {
                        if (err) {
                            res.render('error', {title: "Error", message: err.message});
                        } else
                        {
                            if (courses !== null && courses.length > 0)
                            {
                                let str = "UPDATE courses SET code = ?, name = ?, syllabus = ?, level = ?, credits = ? WHERE id = ?";
                                db.run(str, [code, name, syllabus, level, credits, courseid], (err) => {
                                    if (err) {
                                        res.render('error', {title: "Error", message: err.message});
                                    } else {
                                        res.render('error', {title: "Meddelande från Servern", message: "Kursen har uppdaterats."});
                                    }
                                });
                            } else
                            {
                                res.render('error', {title: "Meddelande från Servern", message: "Kursen finns INTE i databasen."});
                            }
                        }
                    });
                    db.close();
                });
            }
        });
    }
});
module.exports = router;