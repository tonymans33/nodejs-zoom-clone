const express = require('express');
const apiRouter = require('./routes/api')

var app = express()
app.set('view engine', 'ejs')

app.use(express.static('public'))

// Routes
app.use("/api", apiRouter);

module.exports = app;