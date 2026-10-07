var express = require('express');
var router = express.Router();
const { HomeController } = require('../controller');
const { authStack,toHome } = require('../middleware');

router.get('/',authStack,toHome,HomeController.toLogin)
router.get('/home',HomeController.renderHome);
router.get('/profile',authStack,HomeController.renderProfile);
router.get('/return-device',authStack,HomeController.renderReturnDevice);
router.get('/:endpoint',authStack,HomeController.renderShop);


module.exports = router;
