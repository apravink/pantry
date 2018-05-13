const config = require("../../config");

exports.callVisionApi = base64Image => {
  console.log(`yoy ${base64Image}  ${config.GOOGLE_VISION_API_KEY}`);
};
