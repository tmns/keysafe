import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";

import * as config from "./config/config";
import { connect } from "./db";
import users from "./routes/api/users";
import groups from "./routes/api/groups";

let MongoDBStore = require("connect-mongodb-session")(session);

async function start() {
  const app = express();

  // disable leaking info of what server we're using
  app.disable("x-powered-by");

  const serverUrl = `${config.PROTO}://${config.HOST}:${config.PORT}`;

  const corsOptions = {
    origin: ["http://localhost:3000", serverUrl, process.env.PROD_URL],
    credentials: true
  };

  app.use(cors(corsOptions));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  let store = new MongoDBStore({
    uri: config.DB_URI,
    collection: "sessions"
  });

  store.on("error", function(error) {
    console.log(error);
  });

  app.use(
    session({
      name: config.SESS_NAME,
      secret: config.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV == "production",
        maxAge: config.SESS_LIFETIME
      },
      store
    })
  );

  // to force express to recognize connection as HTTPS and receive cookie with 'secure' set
  app.set("trust proxy", 1);

  app.use("/api/users", users);
  app.use("/api/groups", groups);

  // serve static assets if in prod
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "public")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "public", "index.html"));
    });
  }

  // attempt to connect to db
  try {
    await connect(config.DB_URL);
  } catch (err) {
    console.log(`Error connecting to db: ${err}`);
  }


  app.listen(config.PORT, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${config.PORT}`);
  });
}

export default start;
