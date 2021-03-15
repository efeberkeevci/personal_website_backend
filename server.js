/*TODO:
 * With express, write endpoints to 
 * get days
 * get activities of a day and
 * get detail and tags of an activity
 * insert new day with activities and details
 */

const express = require("express");
const app = express()
const { getDays, getActivities, getActivityDetails, postNewDay, dbConn, initConnectiontoDB } = require("./db")
const port = 3000

app.listen(port, () => {
    initConnectiontoDB(dbConn);
    console.log(`Server listening at port ${port}`);
})

app.get("/days", getDays);
app.get("/activities:day", getActivities());
app.get("/details:activity_id", getActivityDetails());
app.post("/day", postNewDay());