import * as config from '../config/config';

function sessionChecker(req, res, next) {
  if (!req.session.user) {
    res.status(401).json({ error: 'Not authenticated'})
  } else {
    next();
  }
}

export {
  sessionChecker
}