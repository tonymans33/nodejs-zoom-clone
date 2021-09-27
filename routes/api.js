const express = require("express");
var app = express();
const roomRoutes = require('./roomRoutes');

app.use("/", roomRoutes);

module.exports = app;