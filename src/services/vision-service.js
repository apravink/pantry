const config = require('../../config');
const axios = require('axios');

exports.callVisionApi = base64Image => {
  if (!base64Image || typeof base64Image !== 'string') {
    throw new Error('Input is not a valid base64 string');
  }
  const requestBody = {
    requests: [
      {
        features: [
          {
            type: 'TEXT_DETECTION'
          }
        ],
        image: {
          source: {
            imageUri: 'gs://bucket-name-123/abbey_road.jpg'
          }
        }
      }
    ]
  };

  //ToDo: Use axios to make post call to vision api
  axios
    .post(
      `${config.GOOGLE_VISION_ENDPOINT}?key=${config.GOOGLE_VISION_API_KEY}`,
      {
        ...requestBody
      }
    )
    .then(response => console.log(response))
    .catch(error => console.log(error));
};
