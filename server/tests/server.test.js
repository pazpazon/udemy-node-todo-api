const expect = require('expect');
const supertest = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333444
}];

beforeEach( (done) => {
    Todo.remove({}).then( () => {
        return Todo.insertMany(todos);
    }).then( () => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        supertest(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect( (res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then( (todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch( (e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        supertest(app)
            .post('/todos')
            .send({text: "     "})
            .expect(400)
            .end( (err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then( (todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch( (e) => done(e) );
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        supertest(app)
            .get('/todos')
            .expect(200)
            .expect( (res) => {
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
            .expect( (res) => {
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
            .expect( (res) => {
                expect(res.body.todo.text).toBe(todos[1].text);
            })
            .end( (err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexId).then( (doc) => {
                    expect(doc).toNotExist();
                    done();
                }).catch( (e) => {
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

describe('PATCH /todos/:id', () =>{
   it('should update todo', (done) => {
       let id = todos[0]._id.toHexString();

       supertest(app)
           .patch(`/todos/${id}`)
           .send({
               text: 'this is the updated text',
               completed: true
            })
            .expect(200)
            .expect( (res) => {
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
            .expect( (res) => {
                expect(res.body.todo.text).toBe('changed to this one');
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
   });
});