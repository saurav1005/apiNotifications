const fetch = require('node-fetch');

exports.postNotificationFetch = async (url, formData, headers) => {
  try {
    const options = {
      method: 'POST',
      body: formData,
      headers,
    };
    const response = await fetch(url, options);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};
