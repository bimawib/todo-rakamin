const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const client = require('./db');

const TodoRoutes = require('./routes/TodoRoutes');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API IS WORKING!');
});

app.use('/api/todos', TodoRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('server running in port 3000');
  });

  client.connect((err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Database Connected');
    }
  });
}

module.exports = app;
