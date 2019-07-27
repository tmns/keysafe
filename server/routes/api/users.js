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

 module.exports = router;