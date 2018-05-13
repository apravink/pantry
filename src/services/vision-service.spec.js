/* eslint-env mocha */
const { expect } = require("chai");
const VisionService = require("./vision-service");

describe("VisionService", () => {
  it("should be a function", () => {
    VisionService.callVisionApi();
    expect(VisionService.callVisionApi).to.be.a("function");
  });
});
