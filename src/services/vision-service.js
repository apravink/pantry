const config = require('../../config');
const

exports.callVisionApi = base64Image => {
  if (!base64Image || typeof base64Image !== 'string') {
    throw new Error('Input is not a valid base64 string');
  }

  //ToDo: Use axios to make post call to vision api
};
