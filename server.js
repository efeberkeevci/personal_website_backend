const { Client } = require('pg');
var pg = require('pg');
var format = require('pg-format');
require('dotenv').config()

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const { credentials } = require("./credentials")
pg.defaults.ssl = true;


const client = new Client(credentials);
client.connect(function(err) {
    if (err) console.log("Error at db connection: ", err);
    else {
        console.log("Connected!");
    }
});

function getDays() {
    let query = "SELECT * FROM day;"
    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(res.rows);
    });

}

function postNewDay() {
    const date = (new Date()).toLocaleString("en-US")
    query = format("INSERT INTO day (id,date,activities) VALUES(%L,%L, NULL)", parseInt(Math.random() * 1000), date);
    console.log(query);
    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(res.rows);
    });
}

console.log("Starting database interaction");
getDays();
console.log("Inserting a new day to the db");
postNewDay();
getDays();