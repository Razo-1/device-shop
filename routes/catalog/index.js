const express = require('express');
const catalogRouter = express.Router();
const { CatalogController } = require('../../controller');

catalogRouter.get('/catalog',CatalogController.renderCatalog)

module.exports = { catalogRouter }