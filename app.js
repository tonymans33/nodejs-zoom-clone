const express = require('express');
const apiRouter = require('./routes/api')
var app = express()


// Routes
app.use("/api", apiRouter);

module.exports = app;