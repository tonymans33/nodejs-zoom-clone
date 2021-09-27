const express = require('express')
var app = express();
app.set('view engine', 'ejs');

const config = require('./config/config')
const { v4: uuidV4 } = require('uuid')

const port = config.app.PORT || 3030

const server = require('http').Server(app)
const io = require('socket.io')(server)


app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
  })
  
  app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
  })



server.listen(port, () => {
    console.log(`Application is running on http://localhost:${port}`);
});


io.on('connection', socket => {
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected');
    })

})
