const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

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

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Hasło musi mieć conajmniej 6 znaków i nie więcej niż 30';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Proszę podać hasło drugi raz';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Hasła nie są takie same';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
