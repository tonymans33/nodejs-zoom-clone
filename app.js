const express = require('express');
var path = require('path');
const apiRouter = require('./routes/api')

var app = express()

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use("/api", apiRouter);

module.exports = app;