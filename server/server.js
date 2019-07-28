import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

import * as config from './config/config';
import { connect } from './db';
import users from './routes/api/users';
import groups from './routes/api/groups';

let MongoDBStore = require('connect-mongodb-session')(session);

async function start() {
  try {
    await connect(config.DB_URL);
  } catch (err) {
    console.log(`Error connecting to db: ${err}`);
  }

  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  let store = new MongoDBStore({
    uri: config.DB_URI,
    collection: 'sessions'
  });

  store.on('error', function(error) {
    console.log(error);
  })

  app.use(session({
    name: config.SESS_NAME,
    secret: config.SESS_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV == 'production',
      maxAge: config.SESS_LIFETIME
    },
    store
  }));

  app.use('/api/users', users);
  app.use('/api/groups', groups);
    
  app.listen(config.SERVER_PORT, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${config.SERVER_PORT}`);
  });  
}

export default start;