var express = require('express');
var router = express.Router();
const { HomeController } = require('../controller');

router.get('/',HomeController.renderHome);
router.get('/:endpoint',HomeController.renderShop);

module.exports = router;
