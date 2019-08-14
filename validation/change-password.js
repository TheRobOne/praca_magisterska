const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Hasło jest wymagane';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Hasło jest wymagane';
  }

  if(data.password != data.password2) {
      errors.password = 'Hasła różnią się od siebie'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
