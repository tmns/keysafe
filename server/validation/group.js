import Validator from 'validator';
import isEmpty from './is_empty';

function validateGroupInput(data) {
  var errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Group name is required';
  }

  if (!Validator.isLength(data.name, { min: 1, max: 32 })) {
    errors.name = 'Group name must be between 1 and 32 characters'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateGroupInput;