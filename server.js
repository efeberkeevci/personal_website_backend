const express = require("express");
const { getDays, getActivities, getTags, postNewDay, postNewActivity, postNewTag, dbConn, initConnectiontoDB, getCurrentMonthDays } = require("./db");
const cors = require('cors');
const {getLeetcode} = require("./github_functions");
const app = express()
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
process.env["USER"] = 'sqccndhoqldkop';
process.env["HOST"] = 'ec2-54-164-22-242.compute-1.amazonaws.com';
process.env["DATABASE"] = "dbik2hhhcebdjt";
process.env["PASSWORD"] = "529a74ae5e16be0dc42ab586ed29b6b1b24a91e18cf1926f17bded596b2ed760";
process.env["PORT"] = 5432;

app.listen(process.env.PORT, () => {
    //initConnectiontoDB(dbConn);
    console.log(`Server listening at port ${process.env.PORT}`);
    getLeetcode();
})

app.get("/days", getDays);
app.get("/days/:month", getCurrentMonthDays);
app.get("/activities/:day", getActivities);
app.get("/tags/:activity_id", getTags);
app.post("/day", postNewDay);
app.post("/activity", postNewActivity);
app.post("/tag", postNewTag);
//app.get("/leetcode/:date",getLeetcode);