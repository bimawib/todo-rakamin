const app = require('../app');
const request = require('supertest');

// GET ALL TODO LIST
test('Get Message Success From Get All Todo API', (done) => {
  request(app)
    .get('/api/todos/')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      expect(response.body.message).toBe('success');
      done();
    })
    .catch(done);
});

// GET TODO BY ID
test('Get Count Data From First Page Todo API', (done) => {
  request(app)
    .get('/api/todos/')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      expect(response.body.data.length).toBeGreaterThan(1);
      done();
    })
    .catch(done);
});

// CREATE TODO
test('Create data for Todo List', async () => {
  const todo = {
    todo: 'MAEN APEX',
    details: 'TEMBAK TEMBAKAN JEDAR JEDER HEDSHOT',
    status: 'on progress',
  };

  const response = await request(app)
    .post('/api/todos')
    .send(todo);

  expect(response.status).toBe(200);
  expect(response.body.data).toHaveProperty('id');
  expect(response.body.data.todo).toBe(todo.todo);
  expect(response.body.data.details).toBe(todo.details);
  expect(response.body.data.status).toBe(todo.status);
});

// UPDATE TODO
test('Update data with PUT method', async () => {
  const todoId = 1;
  const todoUpdated = {
    todo: 'AI KOTOBA',
    details: 'V.3',
    status: 'completed',
  };

  const response = await request(app)
    .put(`/api/todos/${todoId}`)
    .send(todoUpdated);

  expect(response.status).toBe(200);
  expect(response.body.data).toHaveProperty('id');
  expect(response.body.data.todo).toEqual(todoUpdated.todo);
  expect(response.body.data.details).toEqual(todoUpdated.details);
  expect(response.body.data.status).toEqual(todoUpdated.status);
});

// DELETE TODO
test('Delete data with DELETE method', async () => {
  const newTodo = {
    todo: 'BEING A GOOD DEVELOPER',
    details: 'its hard',
    status: 'on progress',
  };

  const createResponse = await request(app)
    .post('/api/todos')
    .send(newTodo);
  expect(createResponse.status).toBe(200);
  const todoId = createResponse.body.data.id;

  const deleteResponse = await request(app).delete(`/api/todos/${todoId}`);
  expect(deleteResponse.status).toBe(200);
  expect(deleteResponse.body.message).toBe('To do task has been deleted');

  const getResponse = await request(app).get(`/todos/${todoId}`);
  expect(getResponse.status).toBe(404);
});
