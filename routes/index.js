var express = require('express');
var router = express.Router();
const { HomeController } = require('../controller');
const { authStack } = require('../middleware');

router.get('/',HomeController.toLogin)
router.get('/home',HomeController.renderHome);
router.get('/profile',authStack,HomeController.renderProfile);
router.get('/:endpoint',authStack,HomeController.renderShop);


module.exports = router;
