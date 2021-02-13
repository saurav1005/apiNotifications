exports.createErrorResponse = (errCode, status, errMsg) => {
  return {
    code: errCode,
    status: status || 'Error',
    message: errMsg,
  };
};
