import Validator from 'validator';
import isEmpty from './is_empty';

function validateKeyInput(data) {
  var errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.url = !isEmpty(data.url) ? data.url : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateKeyInput;