import polka from 'polka';
import bcrypt from 'bcrypt';

import { User } from '../../models/User';
import validateRegisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';

const userRouter = polka();

// @route GET api/users/test
// @desc Test users route
// @access Public
userRouter.get('/test', (req, res) => {
    console.log('made it')
    return res.json({ msg: 'users works' })
  }  
);

export default userRouter;