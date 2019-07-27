import Validator from 'validator';

import isEmpty from './is_empty';

function validateUpdateUserInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';
  data.currentPassword = !isEmpty(data.currentPassword) ? data.currentPassword : '';

  if (!Validator.isEmpty(data.username)) {
    if (!Validator.isLength(data.username, { min: 2, max: 16 })) {
      errors.username = 'Username must be between 2 and 16 characters';
    }
    
    if (Validator.isEmpty(data.currentPassword)) {
      errors.currentPassword = 'Current password required';
    }
  }

  if (!Validator.isEmpty(data.newPassword)) {
    if (!Validator.isLength(data.newPassword, { min: 8, max: 64})) {
      errors.username = 'Password must be between 8 and 64 characters';
    }

    if (!Validator.equals(data.newPassword, data.confirmPassword)) {
      errors.confirmPassword = 'Passwords must match';
    }
    
    if (Validator.isEmpty(data.currentPassword)) {
      errors.currentPassword = 'Current password required';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateUpdateUserInput;