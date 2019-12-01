---
title: Express RESTful API Server
description: Express RESTful API Server with Knex and PostgreSQL and deployed to PCF.
reviewed: true
authorbox: true
toc: true
related: true
categories:
    - 'express'
tags:
    - 'express'
    - 'javascript'
    - 'server'
    - 'rest'
    - 'api'
    - 'library'
    - 'framework'
---

Express RESTful API Server with Knex and PostgreSQL and deployed to PCF.
<!--more-->

## Using the Express Application Generator

You can scaffold a new Express project with the [express application generator](https://expressjs.com/en/starter/generator.html):

```bash
npx express-generator --no-view --git <app-name>
cd <app-name>
yarn                # or run `npm install`
```

## Adding Additional Libraries

```bash
yarn add cfenv          # for reading PCF environment variables
yarn add dotenv         # for reading variables from a `.env` file
yarn add pg             # for connecting to a PostgreSQL database
yarn add morgan         # for enhanced logging to console
yarn add cors           # for configuring CORS support
yarn add jest           # test runner and assertion library
yarn add jest-extended  # additional assertions for jest
yarn add supertest      # for testing RESTful API endpoints
```

## Example `package.json`

```json
{
    "name": "my-server",
    "version": "0.0.0",
    "private": true,
    "scripts": {
        "start": "NODE_ENV=production node ./bin/www",
        "dev": "NODE_ENV=development PORT=3002 DEBUG=my-server:* nodemon --inspect ./bin/www",
        "migrate": "knex migrate:latest",
        "seed": "knex seed:run",
        "db-reset": "knex migrate:rollback all && yarn migrate && yarn seed && psql -d todos -f set-sequence.sql",
        "db-reset-prod": "knex --env production migrate:rollback all && knex --env production migrate:latest && knex --env production seed:run",
        "db-verify": "psql -d todos -f verify.sql",
        "db-verify-prod": "psql -h ld00228 -U todoapp -d todoapp -f verify.sql",
        "model-tester": "NODE_ENV=test jest --testPathPattern=\"models/.*\\.test\\.js\"",
        "route-tester": "NODE_ENV=test PORT=3004 jest --testPathPattern=\"routes/.*\\.test\\.js\"",
        "test": "yarn model-tester && yarn route-tester"
    },
    "dependencies": {
        "cfenv": "1.2.2",
        "cookie-parser": "~1.4.3",
        "cors": "2.8.5",
        "debug": "~2.6.9",
        "dotenv": "8.2.0",
        "express": "~4.16.0",
        "knex": "0.19.5",
        "morgan": "~1.9.0",
        "pg": "7.12.1"
    },
    "devDependencies": {
        "jest": "^24.9.0",
        "jest-extended": "^0.11.2",
        "supertest": "^4.0.2"
    }
}
```

## Example `app.js`

```js
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const todosRouter = require('./routes/todos')

const app = express()

app.use(
    cors({
        origin: /homedepot\.com$/,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
)

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/todos', todosRouter)

module.exports = app
```

## Creating the `knexfile.js` configuration file.

```bash
knex init
```

### Sample `knexfile.js`

```js
const cfenv = require('cfenv')
const debug = require('debug')('my-server')

const appEnv = cfenv.getAppEnv()
const credentials = appEnv.getServiceCreds('my-server-db')

// console.log('credentials:', JSON.stringify(credentials, null, 4));

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: '127.0.0.1',
            database: 'todos',
            charset: 'utf8'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            host: credentials ? credentials.host : process.env.DB_HOST,
            database: credentials ? credentials.database : process.env.DB_NAME,
            user: credentials ? credentials.user : process.env.DB_USER,
            password: credentials
                ? credentials.password
                : process.env.DB_PASSWORD
        },
        pool: {
            min: 2,
            max: 10
        }
    }
}
```

### Sample `.env` file

```
DB_HOST=<hostname>.homedepot.com
DB_NAME=<db_name>
DB_USER=<db_user_name>
DB_PASSWORD=<db_password>
```

## An Example Knex Migration Script

```bash
knex migrate:make create_todos
```

```js
// migrations/20191021101030_create_todos.js
exports.up = function(knex) {
    return knex.schema.hasTable('todos').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('todos', function(table) {
                table
                    .increments('id')
                    .primary()
                    .comment('Auto-generated id')
                table.string('title')
                table.boolean('completed')
                table.timestamps(true, true)
            })
        }
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('todos')
}
```

## Example Knex Database Connecction File

```js
'use strict'

const env = process.env.NODE_ENV || 'development'
const knexfile = require('../knexfile')
const knex = require('knex')(knexfile[env])

module.exports = knex
```

## A Generic Knex Model Factory

```js
// helpers/create-model.js
'use strict'

// The guts of a model that uses Knexjs to store and retrieve data from a
// database using the provided `knex` instance. Custom functionality can be
// composed on top of this set of common guts.
//
// The idea is that these are the most-used types of functions that most/all
// "models" will want to have. They can be overriden/modified/extended if
// needed by composing a new object out of the one returned by this function ;)
module.exports = ({
    knex,
    name,
    tableName,
    selectableProps,
    sortArray = [],
    timeout = 1000
}) => {
    const create = props => {
        delete props.id // not allowed to set `id`

        return knex
            .insert(props)
            .returning(selectableProps)
            .into(tableName)
            .timeout(timeout)
    }

    const findAll = () =>
        knex
            .select(selectableProps)
            .from(tableName)
            .modify(function(queryBuilder) {
                sortArray.forEach(({ field, direction }) =>
                    queryBuilder.orderBy(field, direction)
                )
            })
            .orderBy('created_at', 'asc') // TODO: make configurable
            .timeout(timeout)

    const find = filters =>
        knex
            .select(selectableProps)
            .from(tableName)
            .where(filters)
            .timeout(timeout)

    // Same as `find` but only returns the first match if >1 are found.
    const findOne = filters =>
        find(filters).then(results => {
            if (!Array.isArray(results)) return results

            return results[0]
        })

    const findById = id =>
        knex
            .select(selectableProps)
            .from(tableName)
            .where({ id })
            .timeout(timeout)

    const update = (id, props) => {
        delete props.id // not allowed to set `id`

        return knex
            .update(props)
            .from(tableName)
            .where({ id })
            .returning(selectableProps)
            .timeout(timeout)
    }

    const destroy = id =>
        knex
            .del()
            .from(tableName)
            .where({ id })
            .timeout(timeout)

    return {
        name,
        tableName,
        selectableProps,
        timeout,
        create,
        findAll,
        find,
        findOne,
        findById,
        update,
        destroy
    }
}
```

## Example Model using `create-model`

```js
// models/todo.js
'use strict'

const createModel = require('../helpers/create-model')

const name = 'Todo'
const tableName = 'todos'

const selectableProps = ['id', 'title', 'completed', 'updated_at', 'created_at']

module.exports = knex => {
    const model = createModel({
        knex,
        name,
        tableName,
        selectableProps,
        sortArray: [{ field: 'created_at', direction: 'asc' }]
    })

    return model
}
```

## Exporting all Model Files Programmatically

```js
// models/index.js
'use strict'

const fs = require('fs')
const path = require('path')
const knex = require('../config/database')

const getModelFiles = dir =>
    fs
        .readdirSync(dir)
        .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
        .map(file => path.join(dir, file))

// Gather up all model files (i.e., any file present in the current directory
// that is not this file) and export them as properties of an object such that
// they may be imported using destructuring like
// `const { MyModel } = require('./models')` where there is a model named
// `MyModel` present in the exported object of gathered models.
const files = getModelFiles(__dirname)

const models = files.reduce((modelsObj, filename) => {
    const initModel = require(filename)
    const model = initModel(knex)

    if (model) modelsObj[model.name] = model

    return modelsObj
}, {})

module.exports = models
```

## Example Routes File

```js
// routes/todos.js
var express = require('express')
const { Todo } = require('../models')
var router = express.Router()

router
    .route('/')
    .post(addTodo)
    .get(getTodos)

router
    .route('/:id')
    .get(getTodo)
    .put(updateTodo)
    .delete(deleteTodo)

function getTodos(req, res, next) {
    Todo.findAll()
        .then(todos => res.json(todos))
        .catch(next)
}

function getTodo(req, res, next) {
    const todoId = req.params.id

    Todo.findById(todoId)
        .then(todo => res.json(todo))
        .catch(next)
}

function addTodo(req, res, next) {
    const props = req.body

    Todo.create(props)
        .then(todos => res.json(todos[0]))
        .catch(next)
}

function updateTodo(req, res, next) {
    const todoId = req.params.id
    const props = req.body

    Todo.update(todoId, props)
        .then(todos => res.json(todos[0]))
        .catch(next)
}

function deleteTodo(req, res, next) {
    const todoId = req.params.id

    Todo.destroy(todoId)
        .then(deleteCount => res.json(deleteCount))
        .catch(next)
}

module.exports = router
```

## Tests for Example Routes File

```js
// routes/todos.test.js
require('jest-extended');
const supertest = require('supertest');
const TodosErrors = require('../models/TodosErrors');

const port = process.env.PORT || '3000';
const api = supertest(`localhost:${port}/api/todos`);

describe('Todos Routes', () => {

    let server;
    beforeAll(next => {
        server = require('../bin/www');
        next();
    });
    afterAll(next => {
        server.close();
        next();
    });

    describe('INDEX ROUTE', () => {
        test('should return a 200 response and return 3 todos each having a title', done => {
            api.get('/')
                .set('Accept', 'application/json')
                .expect(200)
                .then(res => {
                    const todos = res.body;
                    expect(todos).not.toBeNull();
                    expect(todos).toBeArray();
                    expect(todos.length).toEqual(3);
                    expect(todos[1]).toHaveProperty('title', 'Learn Redux');
                    todos.forEach(todo => {
                        expect(todo).toHaveProperty('title');
                    });
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });

    describe('SHOW ROUTE', () => {
        test('should return a 404 response when given an invalid id', done => {
            api.get('/123')
                .set('Accept', 'application/json')
                .expect(TodosErrors.notFound.code)
                .then(res => {
                    const error = res.body;
                    expect(error).not.toBeNull();
                    expect(error).toHaveProperty('message', TodosErrors.notFound.message);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
        test('should return a 200 response and return Learn Redux when given the proper id', done => {
            api.get('/2')
                .set('Accept', 'application/json')
                .expect(200)
                .then(res => {
                    const todo = res.body;
                    expect(todo).not.toBeNull();
                    expect(todo).toHaveProperty('title', 'Learn Redux');
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });

    describe('CREATE ROUTE', () => {
        test('should return a 422 response and return an error message when given an empty title', done => {
            api.post('/')
                .set('Accept', 'application/json')
                .send({
                    title: ''
                })
                .expect(TodosErrors.invalidTitle.code)
                .then(res => {
                    const error = res.body;
                    expect(error).toHaveProperty('message', TodosErrors.invalidTitle.message);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
        test('should return the new todo when given a valid title and default the completed status to false', done => {
            api.post('/')
                .set('Accept', 'application/json')
                .send({
                    title: 'Learn TDD'
                })
                .expect(201)
                .then(res => {
                    const todo = res.body;
                    expect(todo).not.toBeNull();
                    expect(todo).toHaveProperty('title', 'Learn TDD');
                    expect(todo).toHaveProperty('completed', false);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
        test('should return the new todo when given a valid title and a completed status of true', done => {
            api.post('/')
                .set('Accept', 'application/json')
                .send({
                    title: 'Learn TDD',
                    completed: true
                })
                .expect(201)
                .then(res => {
                    const todo = res.body;
                    expect(todo).not.toBeNull();
                    expect(todo).toHaveProperty('title', 'Learn TDD');
                    expect(todo).toHaveProperty('completed', true);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });

    describe('UPDATE ROUTE', () => {
        test('should return a 404 response and when given an invalid id', done => {
            api.put('/123')
                .set('Accept', 'application/json')
                .send({
                    title: 'Learn go',
                    completed: false
                })
                .expect(TodosErrors.notFound.code)
                .then(res => {
                    const error = res.body;
                    expect(error).not.toBeNull();
                    expect(error).toHaveProperty('message', TodosErrors.notFound.message);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
        test('should return a 422 response and return an error message when given an empty title', done => {
            api.put('/2')
                .set('Accept', 'application/json')
                .send({
                    title: '',
                    completed: true
                })
                .expect(TodosErrors.invalidTitle.code)
                .then(res => {
                    const error = res.body;
                    expect(error).toHaveProperty('message', TodosErrors.invalidTitle.message);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
        test('should return a 200 response and return the updated todo when given a valid title', done => {
            api.put('/2')
                .set('Accept', 'application/json')
                .send({
                    title: 'Learn go',
                    completed: true
                })
                .expect(200)
                .then(res => {
                    const todo = res.body;
                    expect(todo).not.toBeNull();
                    expect(todo).toHaveProperty('title', 'Learn go');
                    expect(todo).toHaveProperty('completed', true);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });

    describe('destroyTodo', () => {
        test('should return a 404 response when given an invalid id', done => {
            api.delete('/123')
                .set('Accept', 'application/json')
                .expect(TodosErrors.notFound.code)
                .then(res => {
                    const error = res.body;
                    expect(error).not.toBeNull();
                    expect(error).toHaveProperty('message', TodosErrors.notFound.message);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
        test('should return the deleted todo when given a valid id', done => {
            api.delete('/3')
                .set('Accept', 'application/json')
                .expect(200)
                .then(res => {
                    const todo = res.body;
                    expect(todo).not.toBeNull();
                    expect(todo).toHaveProperty('title', 'Learn GraphQL');
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });
});
```

## PCF Deployment

### Sample `manifest.yml` file

```yml
---
applications:
    - name: my-server
      command: npm start
      buildpack: https://github.com/cloudfoundry/nodejs-buildpack
```

### Sample `.cfignore` file

```
node_modules
```

### Login to PCF and push server

```bash
cf login -a https://api.run-np.homedepot.com -u <ldap-user-id> -o <org-name> -s <space-name>
cf push
open https://login.run-np.homedepot.com   # To open PCF Apps Manager - login with LDAP credentials
```

