const { Client } = require('pg');
var format = require('pg-format');
require('dotenv').config()
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const dbConn = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

function initConnectiontoDB(dbConn) {
    dbConn.connect(function(err) {
        if (err) console.log("Error at db connection: ", err);
        else {
            console.log("Connected to the database!");
        }
    });
}

function getDays(req, res) {
    const query = "SELECT * FROM day;"
    dbConn.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result.rows);
        res.status(200).send(result.rows)
    });

}

function getCurrentMonthDays(req, res) {
    const month = req.param("month");
    const query = format("SELECT * FROM day WHERE day.month = %L", month);
    console.log(query);
    dbConn.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result.rows);
        res.status(200).send(result.rows)
    });
}

function postNewDay(req, res) {
    const activities = req.body.activities;
    const date = (new Date()).toLocaleString("en-US");
    const query = format("INSERT INTO day (date) VALUES(%L) RETURNING day_id", date);

    dbConn.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(400).send()
            return;
        }
        res.status(200).send("Succesfully added the day and activities");
        return;
    });
}

function postNewActivity(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const day_id = req.body.day;
    //const tags = req.body.tags == undefined ? [] : req.body.tags;
    const query = format("INSERT INTO activity (title,description,day) VALUES(%L, %L,%L) RETURNING activity_id", title, description, day_id);
    console.log(query);
    dbConn.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(400).send()
            return;
        }
        res.status(200).send("Succesfully added activities with tags");
        return;
    });
}

/*
function createNewActivity(title, description, date) {
    const query = format("INSERT INTO activity (title,description,day) VALUES(%L, %L,%L) RETURNING *", title, description, date);

    dbConn.query(query, (err, result) => {
        console.log(result);
        if (err) {
            console.error("Error on activity creation", err);
            return undefined;
        }

        return result.rows[0].activity_id;
    });
}
*/

function postNewTag(req, res) {
    const tag_name = req.body.name;
    const activity_id = req.body.activity;
    const query = format("INSERT INTO tag(name,activity) VALUES(%L,%L) RETURNING *", tag_name, activity_id);
    console.log(query);
    dbConn.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(400).send()
            return;
        }
        res.status(200).send("Succesfully added tag");
        console.log(rows[0].id);
        return;
    });
}

/*
function createNewTag(tag_name, activity_id) {
    const query = format("INSERT INTO 'tag'('name', 'activity') VALUES(%L,%L) RETURNING", tag_name, activity_id);
    dbConn.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return false;
        }
        return true;
    });
}
*/

function getActivities(req, res) {
    let day = req.param("day");
    const query = format("SELECT * FROM activity WHERE activity.day = %L", day);
    dbConn.query(query, (err, result) => {
        if (err) {
            console.error(err);
            result.status(400).send()
            return;
        }
        res.status(200).send(result.rows);
        return;
    });
}

function getTags(req, res) {
    let activity = req.param("activity_id");
    const query = format("SELECT * FROM tag WHERE tag.activity = %L", activity);
    dbConn.query(query, (err, result) => {
        if (err) {
            console.error(err);
            result.status(400).send()
            return;
        }
        res.status(200).send(result.rows);
        return;
    });

}


module.exports = { initConnectiontoDB, getDays, getCurrentMonthDays, getActivities, getTags, postNewDay, postNewActivity, postNewTag, dbConn };

/*

        activities.forEach(element => {
            console.log("Activity: ", element);
            let activity_id = createNewActivity(element.title, element.description, result.rows[0].day_id);
            if (activity_id == undefined) {
                res.status(400).send()
                return;
            }
            console.log("Handling tags");

            element.tags.forEach(tag => {
                console.log("Tag ", tag);
                let tag_creation_error = createNewTag(tag.name, activity_id);
                if (tag_creation_error != true) {
                    console.error(err);
                    res.status(400).send()
                    return;
                }
            });
        });
*/


/*
tags.forEach(tag => {
            let tag_creation_error = createNewTag(tag.name, result.rows[0].activity_id);
            if (tag_creation_error != true) {
                console.error(err);
                res.status(400).send()
                return;
            }
        });
*/