const { Client } = require('pg');
var pg = require('pg');
var format = require('pg-format');


process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const { credentials } = require("./credentials")
pg.defaults.ssl = true;
const client = new Client(credentials);

client.connect();

//Gets all days
let query = "SELECT * FROM day;"
client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(res.rows);
});



const date = (new Date()).toLocaleString("en-US")
query = format("INSERT INTO day (id,date,activities) VALUES(44,%L, NULL)", date);
console.log(query);
client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(res.rows);
});