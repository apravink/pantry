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
          content: base64Image
        }
      }
    ]
  };

  return (
    axios
      .post(
        `https://vision.googleapis.com/v1/images:annotate?key=${
          config.GOOGLE_VISION_API_KEY
        }`,
        {
          ...requestBody
        }
      )
      // .then(response => console.log(response.data.responses[0]))
      .then(response => {
        if (response.data.responses[0].error) {
          return response.data.responses[0];
        }

        return response.data.responses[0].fullTextAnnotation.text
          .split(',')
          .map(ingredient => {
            return ingredient.replace(/r\n|\r|\n|$/, '');
          });
      })
      .catch(error => console.log('error', error))
  );
};
