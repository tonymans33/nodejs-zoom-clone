

exports.generateUuid = (req, res) => {
    res.redirect(`/${uuidv4()}`)
}

exports.getChat = (req, res) => {
    res.render('../views/room', { roomId: req.params.room })
}