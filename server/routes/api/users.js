import express from 'express';
import bcrypt from 'bcrypt';

import { User } from '../../models/User';
import validateRegisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';

const router = express.Router();

// @route GET api/users/test
// @desc Test users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'users works' }));

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

export default router;