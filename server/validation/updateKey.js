import Validator from 'validator';

import isEmpty from './is_empty';

function validateUpdateKeyInput(data) {
  var errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.url = !isEmpty(data.url) ? data.url : '';

  if (!Validator.isEmpty(data.title)) {
    if (!Validator.isLength(data.title, { min: 1, max: 64 })) {
      errors.title = 'Title must be between 1 and 64 characters';
    }
  }

  if (!Validator.isEmpty(data.username)) {
    if (!Validator.isLength(data.username,  { min: 1, max: 64 })) {
      errors.username = 'Username must be between 1 and 64 characters';
    }
  }

  if (!Validator.isEmpty(data.password)) {
    if (!Validator.isLength(data.password, { min: 8, max: 64 })) {
      errors.password = 'Password must be between 8 and 64 characters';
    }
  }

  if (!Validator.isEmpty(data.url)) {
    if (!Validator.isLength(data.url, { min: 1, max: 64 })) {
      errors.url = 'Url must be between 1 and 64 characters';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateUpdateKeyInput;