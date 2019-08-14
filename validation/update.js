const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUpdateInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.role = !isEmpty(data.role) ? data.role : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Imię i nazwisko musi zawierać się w przedziale od 2 do 30 znaków';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Imię i nazwisko jest wymagane';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Adres email jest wymagany';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Adres email jest niepoprawany';
  }

  if (!Validator.isIn(data.role, ['basic', 'conservator', 'admin'])) {
    errors.role = 'Rola jest niepoprawna';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
