export const {
  PORT = 4000,
  PROTO = 'http',
  HOST = 'localhost',
  DB_NAME = 'keySafeDB',
  DB_URI = 'mongodb://localhost:27017/keySafeDB',
  SESS_NAME = 'sessionId',
  SESS_SECRET = 'test-secret',
  SESS_LIFETIME = 1000 * 60 * 60
} = process.env;