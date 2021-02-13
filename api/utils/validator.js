exports.isEmailValid = (emailId) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regexEmail.test(emailId)) {
    return true;
  }
  return false;
};

exports.isEmpty = (value) => {
  if (
    value !== null &&
    value !== undefined &&
    (isObject(value) || value.trim() !== '')
  ) {
    return false;
  }
  return true;
};

function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object;
}

exports.isValidArray = (array) => {
  return Array.isArray(array);
};
