const app = require('express');
var router = app.Router();
const roomController = require('../controllers/roomController');

router.get('/', roomController.generateUuid)
router.get('/:room', roomController.getChat)

module.exports = router;