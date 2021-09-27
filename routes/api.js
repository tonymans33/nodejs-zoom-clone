const express = require("express");
var app = express();
const roomRoutes = require('./roomRoutes');

app.use("/", roomRoutes);

app.get('/test', (req, res) => { 
    res.status(200).send("Test API is working!!!")
    console.log("yeah!")
    });

module.exports = app;