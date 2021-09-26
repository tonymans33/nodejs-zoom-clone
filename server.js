const express = require('express')
var app = express()

app.set('view engine', 'ejs');

const config = require('./config/config')
const { v4: uuidV4 } = require('uuid')

const port = config.app.PORT || 3030

const server = require('http').Server(app)


// app.use(express.json)

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
  })
  
  app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
  })

// process.on('uncaughtException', err => {
//     console.log('UNCAUGHT EXCEPTION!!! shutting down...');
//     console.log(err.name, err.message);
//     process.exit(1);
// });

server.listen(port, () => {
    console.log(`Application is running on http://localhost:${port}`);
});

// process.on('unhandledRejection', err => {
//     console.log('UNHANDLED REJECTION!!!  shutting down ...');
//     console.log(err.name, err.message);
//     server.close(() => {
//         process.exit(1);
//     });
// });