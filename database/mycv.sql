CREATE TABLE courses(
id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
code varchar(10) NOT NULL,
name varchar(100) NOT NULL,
syllabus text NOT NULL,
level char(2) NOT NULL,
credits REAL NOT NULL
);