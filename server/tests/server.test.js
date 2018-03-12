const expect = require('expect');
const supertest = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    supertest(app)
      .post('/todos')
      .send({
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({
          text
        }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    supertest(app)
      .post('/todos')
      .send({
        text: "     "
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    supertest(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return the todo by id', (done) => {
    supertest(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return a 404 if todo not found', (done) => {
    supertest(app)
      .get(`/todos/${(new ObjectID()).toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 for invalid object id', (done) => {
    supertest(app)
      .get(`/todos/123454321`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete a todo by id', (done) => {
    let hexId = todos[1]._id.toHexString();

    supertest(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[1].text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId).then((doc) => {
          expect(doc).toNotExist();
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });

  it('should return a 404 if id is not found', (done) => {
    let hexId = new ObjectID().toHexString();

    supertest(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 if id is invalid', (done) => {
    supertest(app)
      .delete('/todos/kjh432SE4')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update todo', (done) => {
    let id = todos[0]._id.toHexString();

    supertest(app)
      .patch(`/todos/${id}`)
      .send({
        text: 'this is the updated text',
        completed: true
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.text).toBe('this is the updated text');
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo not completed', (done) => {
    let id = todos[1]._id.toHexString();

    supertest(app)
      .patch(`/todos/${id}`)
      .send({
        text: 'changed to this one',
        completed: false
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe('changed to this one');
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});

describe('GET /users/me', () => {
  
  it('should should return a user if authenticated', (done) => {
    supertest(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect( (res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      }).end(done);
  });

  it('should return a 401 if not authenticated', (done) => {
    supertest(app)
      .get('/users/me')
      .expect(401)
      .expect( (res) => {
        expect(res.body).toEqual({});
      }).end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    supertest(app)
      .post('/users')
      .send({ 
        email: 'zigzigon@hotmail.com',
        password: 'password'
      })
      .expect(200)
      .expect( (res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body.email).toBe('zigzigon@hotmail.com');
        expect(res.body._id).toExist();
      }).end( (err) => {
        
        if (err) {
          return done(err);
        }
        
        User.findOne({email: 'zigzigon@hotmail.com'}).then( (user) => {
          expect(user).toExist();
          expect(user.password).toNotBe('password');
          done();
        });
      });
  });

  it('should should return validation errors if request invalid', (done) => {
    supertest(app)
      .post('/users')
      .send({
        email: 'laksjddjdj',
        password: '1234567'
      })
      .expect(400)
      .end( (err) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
  
  it('should not create user if email already in use', (done) => {
    supertest(app)
      .post('/users')
      .send({
        email: 'pazpazon@gmail.com',
        password: 'password'
      })
      .expect(400)
      .end( (err) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});