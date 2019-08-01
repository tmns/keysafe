import Validator from 'validator';
import isEmpty from './is_empty';

function validateGroupInput(data) {
  var errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Group name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateGroupInput;