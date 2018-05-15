const VisionService = require('../services/vision-service/vision-service');

class ApiController {
  constructor() {
    this.makeCall = this.makeCall.bind(this);
  }
  static async makeCall(req, res, next) {
    if (!req.data) {
      res.json({ error: { code: 1, message: 'Data object is empty' } });
    } else {
      const { data } = req;
      const ingredients = await VisionService.callVisionApi(data);
      const activeIngredients = await FirebaseService.validateIngredients(
        ingredients
      );
      res.json({ ...activeIngredients });
    }
  }
}

module.exports = ApiController;
