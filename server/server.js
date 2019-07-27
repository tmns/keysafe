import polka from 'polka';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

import * as config from './config/config';
import { connect } from './db';

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
  
  function one(req, res, next) {
    req.hello = 'world';
    next();
  }
  
  function two(req, res, next) {
    req.foo = '...needs better demo';
    next();
  }

  try {
    await connect(config.DB_URL);
  } catch (err) {
    console.log(`Error connecting to db: ${err}`);
  }
  
  polka()
    .use(sessionMW, one, two)
    .get('/users/:id', (req, res) => {
      console.log(`-> Hello, ${req.hello}`);
      res.end(`User: ${req.params.id}`);
    })
    .listen(3000, err => {
      if (err) throw err;
      console.log('> Running on localhost:3000');
    });  
}

export default start;