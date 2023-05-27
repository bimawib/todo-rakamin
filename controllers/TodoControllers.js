const { Todo } = require('../models');

const TodoControllers = {
  async get(req, res) {
    const { page, limit } = req.query;
    const pageQuery = parseInt(page, 10) || 1;
    let limitQuery = parseInt(limit, 10) || 10;
    const offset = (pageQuery - 1) * limitQuery;

    if (limitQuery > 100) {
      limitQuery = 100;
    }

    const result = await Todo.findAll({
      limit: limitQuery,
      offset,
    });
    res.status(200).json({
      data: result,
      message: 'success',
    });
  },

  async getById(req, res) {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({
        error: 'Todo not found',
      });
    }
    return res.json({
      data: todo,
      message: 'success',
    });
  },

  async create(req, res) {
    const field = {
      todo: req.body.todo,
      details: req.body.details,
      status: req.body.status,
    };
    const createTodo = await Todo.create(field);
    return res.json({
      data: createTodo,
      message: 'success',
    });
  },

  async update(req, res) {
    const { id } = req.params;
    const field = {
      todo: req.body.todo,
      details: req.body.details,
      status: req.body.status,
    };

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({
        error: 'Todo not found',
      });
    }

    const updateTodo = await Todo.update(field, {
      where: { id },
    });

    const updatedTodo = await Todo.findByPk(id);
    return res.json({
      data: updatedTodo,
      message: 'success',
    });
  },

  async delete(req, res) {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({
        error: 'Todo not found',
      });
    }
    const deletedTodo = await Todo.destroy({ where: { id } });
    return res.json({
      message: 'To do task has been deleted',
    });
  },
};

module.exports = TodoControllers;
