/* eslint-env mocha */
const { expect } = require('chai');
const VisionService = require('./vision-service');
const nock = require('nock');

const GOOGLE_VISION_ENDPOINT = 'https://vision.googleapis.com/v1';

describe(`VisionService`, () => {
  // before(() => {
  //   const visionResponse = {
  //     responses: [
  //       {
  //         textAnnotations: [
  //           {
  //             description: [
  //               'Chimpanzee killing palm oil stuff',
  //               'Other bad stuff'
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   };
  //   nock(GOOGLE_VISION_ENDPOINT)
  //     .post('/images:annotate')
  //     .reply('200', visionResponse);
  // });

  it('should be a function of arity 1', () => {
    expect(VisionService.callVisionApi)
      .to.be.a('function')
      .of.length(1);
  });

  it('it should throw error if input is not a string', () => {
    //Arrange

    const badInput = 2;

    //Assert
    expect(() => VisionService.callVisionApi(badInput)).to.throw(
      'Input is not a valid base64 string'
    );
  });

  it.only('should make a call to the vision api with the base64 string', () => {
    //Arrange
    const encodedString = Buffer.from('YoYo').toString('base64');
    const expectedResult = [
      'Chimpanzee killing palm oil stuff',
      'Other bad stuff'
    ];

    //Act
    const actualResult = VisionService.callVisionApi(encodedString);

    //Assert

    expect(actualResult).to.equal(expectedResult);
  });
});
