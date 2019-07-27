import express from 'express';
import bcrypt from 'bcrypt';

import { User } from '../../models/User';
import validateRegisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';
import { sessionChecker } from '../../utils/auth';

const router = express.Router();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ username: req.body.username });
  
  if (user) {
    return res.status(400).json({ username: 'Username already exists' });
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        try {
          const user = await newUser.save();
          res.json(user);
        } catch(err) {
          console.log(err);
        }
      })
    })
  }
})

// @route POST api/users/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
  if (req.session.user) {
    return res.status(400).json({ error: 'User already authenticated' })
  }
  
  const username = req.body.username;
  const password = req.body.password;

  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ username });
  
  if (!user) {
    errors.username = 'Username not found';
    return res.status(404).json(errors);
  }

  const hashesMatch = await bcrypt.compare(password, user.password);
  
  if (hashesMatch) {
    req.session.user = user.username;
    req.session.userId = user.id;
    res.json({ id: user.id, username: user.username });
  } else {
    errors.password = 'Incorrect password.';
    return res.status(400).json(errors);
  }
})

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get('/current', sessionChecker, (req, res) => {
  res.json({
    id: req.session.userId,
    username: req.session.user
  })
})

// @route POST api/users/logout
// @desc Logout user
// @access Private
router.post('/logout', sessionChecker, (req, res) => {
  req.session.destroy();
  res.json({ message: 'Successfully logged out' });
})

export default router;