const client = require('../db');
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
    const result = await client.query('SELECT * FROM todo OFFSET $1 LIMIT $2', [offset, limitQuery]);
    const todo = result.rows;
    res.status(200).json({ data: todo });
  },

  async getById(req, res) {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    return res.json({ data: todo });
  },
};

module.exports = TodoControllers;
