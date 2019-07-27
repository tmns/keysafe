import Validator from 'validator';

import isEmpty from './is_empty';

function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

  if (!Validator.isLength(data.username, { min: 2, max: 16 })) {
    errors.username = 'Username must be between 2 and 16 characters';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  if (!Validator.isLength(data.password, { min: 8, max: 64 })) {
    errors.password = 'Password must be between 8 and 64 characters';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm password field is required';
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateRegisterInput;