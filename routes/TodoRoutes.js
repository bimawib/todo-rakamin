const express = require('express');
const TodoControllers = require('../controllers/TodoControllers');

const route = express.Router();

route.get('/', TodoControllers.get);
route.get('/:id', TodoControllers.getById);

module.exports = route;
