const validator = require('./validator');

describe('Test Validations utils', () => {
  test('should validate if email is valid', () => {
    const validEmail = 'test@gmail.com';
    const inValidEmail1 = 'testgmail.com';
    const inValidEmail2 = 'test@gmail';
    const inValidEmail3 = 'test@gmail@.com';
    expect(validator.isEmailValid(validEmail)).toBeTruthy();
    expect(validator.isEmailValid(inValidEmail1)).toBeFalsy();
    expect(validator.isEmailValid(inValidEmail2)).toBeFalsy();
    expect(validator.isEmailValid(inValidEmail3)).toBeFalsy();
  });
  test('should validate if string is empty', () => {
    //TODO
  });
  test('should validate if object is array', () => {
    const array = ['email1', 'email2'];
    expect(validator.isValidArray(array)).toBeTruthy();
    expect(validator.isValidArray('array')).toBeFalsy();
  });
});
