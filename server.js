const express = require("express");
const { getDays, getActivities, getTags, postNewDay, postNewActivity, postNewTag, dbConn, initConnectiontoDB } = require("./db");
const cors = require('cors');

const app = express()
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());


app.listen(process.env.PORT, () => {
    initConnectiontoDB(dbConn);
    console.log(`Server listening at port ${process.env.PORT}`);
})

app.get("/days", getDays);
app.get("/activities/:day", getActivities);
app.get("/tags/:activity_id", getTags);
app.post("/day", postNewDay);
app.post("/activity", postNewActivity);
app.post("/tag", postNewTag);