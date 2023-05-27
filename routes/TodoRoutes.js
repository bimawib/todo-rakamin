const express = require('express');
const TodoControllers = require('../controllers/TodoControllers');

const route = express.Router();

route.get('/', TodoControllers.get);
route.get('/:id', TodoControllers.getById);
route.post('/', TodoControllers.create);
route.put('/:id', TodoControllers.update);
route.delete('/:id', TodoControllers.delete);

module.exports = route;
