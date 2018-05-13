class ApiController {
  constructor() {
    this.makeCall = this.makeCall.bind(this);
  }
  static makeCall(req, res, next) {}
}

module.exports = ApiController;
