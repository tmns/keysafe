import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

import * as config from './config/config';
import { connect } from './db';
const users = require('./routes/api/users');

let MongoDBStore = require('connect-mongodb-session')(session);

async function start() {
  let store = new MongoDBStore({
    uri: config.DB_URI,
    collection: 'sessions'
  });

  store.on('error', function(error) {
    console.log(error);
  })

  let sessionMW = session({
    name: config.SESS_NAME,
    secret: config.SESS_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV == 'production',
      maxAge: config.SESS_LIFETIME
    },
    store
  });

  try {
    await connect(config.DB_URL);
  } catch (err) {
    console.log(`Error connecting to db: ${err}`);
  }
  
  function one(req, res, next) {
    req.hello = 'world';
    next();
  }
  
  function two(req, res, next) {
    req.foo = '...needs better demo';
    next();
  }

  function basic(req, res) {
    res.end(`Main: Hello from ${req.method} ${req.url}`);
  }

  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(sessionMW, one, two)
  
  app.use('/api/users', users)
  
  app.get('/', basic);
  
  app.get('/users/:id', (req, res) => {
    console.log(`-> Hello, ${req.hello}`);
    res.end(`User: ${req.params.id}`);
  })
  
    
  app.listen(3000, err => {
    if (err) throw err;
    console.log('> Running on localhost:3000');
  });  
}

export default start;