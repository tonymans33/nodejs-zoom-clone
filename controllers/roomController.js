const { v4: uuidV4 } = require('uuid')

exports.generateUuid = (req, res) => {
    res.redirect(`/${uuidV4()}`);
}

exports.getChat = (req, res) => {
    res.render('room', { roomId: req.params.room })
}