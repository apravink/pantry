const VisionService = require('../services/vision-service/vision-service');
const FirebaseService = require('../services/firebase-service/firebase-service');

class ApiController {
  constructor() {
    this.makeCall = this.makeCall.bind(this);
  }

  static async makeCall(req, res, next) {
    if (!req.body.data) {
      return res
        .status(500)
        .json({ error: { code: 1, message: 'Data object is empty' } });
    }
    const { data } = req.body;
    const ingredients = await VisionService.callVisionApi(data);
    const { error } = ingredients;
    console.log(ingredients);
    if (error || !Array.isArray(ingredients)) {
      return res
        .status(500)
        .json({ error: { code: 2, message: 'Invalid data object' } });
    }

    const activeIngredients = await FirebaseService.validateIngredients(
      ingredients
    );

    return activeIngredients
      ? res.json({ ...activeIngredients })
      : res.json([]);
  }
}

module.exports = ApiController;
