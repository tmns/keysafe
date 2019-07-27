import polka from 'polka';
import bcrypt from 'bcrypt';

import { User } from '../../models/User';
import validateRegisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';

const router = polka.Router();