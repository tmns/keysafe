function sessionChecker(req, res, next) {
  if (!req.session.user || !req.cookies[config.SESS_NAME]) {
    res.status(302).json({ error: 'Not authenticated'})
  } else {
    next();
  }
}

export {
  sessionChecker
}