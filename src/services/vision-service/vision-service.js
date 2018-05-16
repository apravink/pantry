const axios = require('axios');
require('dotenv').config();

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
          content: base64Image
        }
      }
    ]
  };

  return axios
    .post(
      `https://vision.googleapis.com/v1/images:annotate?key=${
        process.env.GOOGLE_VISION_API_KEY
      }`,
      {
        ...requestBody
      }
    )
    .then(response => {
      if (response.data.responses[0].error) {
        return response.data.responses[0];
      }

      return response.data.responses[0].fullTextAnnotation.text
        .split(',')
        .map(ingredient => {
          return ingredient.toLowerCase().replace(/r\n|\r|\n|$/, '');
        });
    })
    .catch(error => console.error('error', error));
};
