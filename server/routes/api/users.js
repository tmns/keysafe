import express from 'express';
import bcrypt from 'bcrypt';

import { User } from '../../models/User';
import validateRegisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';
import validateUpdateUserInput from '../../validation/updateUser';
import { sessionChecker } from '../../utils/auth';
import { Group } from '../../models/Group';

const router = express.Router();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
  if (req.session.user) {
    return res.status(400).json({ error: 'User already authenticated' })
  }

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ username: req.body.username });
  
  if (user) {
    return res.status(400).json({ username: 'Username already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
    
  const newUser = new User({
    username: req.body.username,
    password: hash,
    salt: req.body.salt,
  });
  
  try {
    const user = await newUser.save();
    res.json(user);
  } catch(err) {
    console.log(err);
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
    res.json({ id: user.id, username: user.username, salt: user.salt });
  } else {
    errors.password = 'Incorrect password.';
    return res.status(400).json(errors);
  }
})

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get('/current', sessionChecker, async (req, res) => {
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
  res.json({ success: true });
})

// @route PUT api/users
// @desc Update user
// @access Private
router.put('/', sessionChecker, async (req, res) => {
  const { errors, isValid } = validateUpdateUserInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  var user = await User.findById(req.session.userId);

  const hashesMatch = await bcrypt.compare(req.body.currentPassword, user.password);
  
  if (!hashesMatch) {
    errors.password = 'Incorrect password.';
    return res.status(400).json(errors);
  }

  if (req.body.username != '') {
    const existingUser = await User.findOne({ username: req.body.username });
  
    // if username already exists and it is not the current user's username
    if (existingUser && existingUser.username != req.session.user) {
      return res.status(400).json({ username: 'Username already exists' });
    }

    user.username = req.body.username;
  } 
  
  if (req.body.newPassword != '' ) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.newPassword, salt);

    user.password = hash;
  }

  try {
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch(err) {
    console.log(err);
  }
})

// @route DELETE api/users
// @desc Delete a user
// @access Private
router.delete('/', sessionChecker, async (req, res) => {
  let errors = {};

  if (!req.body.password) {
    errors.password = 'Password required';
    return res.status(400).json(errors);
  }

  const user = await User.findById(req.session.userId);

  const hashesMatch = await bcrypt.compare(req.body.password, user.password);
  
  if (!hashesMatch) {
    errors.password = 'Incorrect password.';
    return res.status(400).json(errors);
  }

  try {
    await user.remove();
    req.session.destroy();
    res.json({ success: true });
  } catch (err) {
    return res.status(400).json(err);
  }
})

// @route GET api/users/salt
// @desc Gets a user's salt
// @access Private
router.get('/salt', sessionChecker, async (req, res) => {
  const user = await User.findById(req.session.userId);
  return res.json({ salt: user.salt });
})

export default router;