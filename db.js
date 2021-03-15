const { Client } = require('pg');
var pg = require('pg');
var format = require('pg-format');
require('dotenv').config()


process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
pg.defaults.ssl = true;
//const connection_string = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`



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
    let query = "SELECT * FROM day;"
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
    const date = (new Date()).toLocaleString("en-US")
    query = format("INSERT INTO day (id,date,activities) VALUES(%L,%L, NULL)", parseInt(Math.random() * 1000), date);
    console.log(query);
    dbConn.query(query, (err, res) => {
        if (err) {
            console.error(err);
            res.status(400).send()
            return;
        }
        console.log(res.rows);
        res.status(200).send();
        return;
    });
}

function getActivities(req, res) {}

function getActivityDetails(req, res) {}

module.exports = { initConnectiontoDB, getDays, getActivities, getActivityDetails, postNewDay, dbConn };