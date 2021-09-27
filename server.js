const app = require('./app');
const server = require('http').Server(app)
const config = require('./config/config')
const port = config.app.PORT || 3030
const io = require('socket.io')(server)


process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});


server.listen(port, () => {
    console.log(`Application is running on http://localhost:${port}`);
});


io.on('connection', socket => {
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected');
    })

})

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});