/* eslint-env mocha */
const { expect } = require('chai');
const VisionService = require('./vision-service');
const fs = require('fs');

describe(`VisionService`, () => {
  it('should be a function of arity 1', () => {
    expect(VisionService.callVisionApi)
      .to.be.a('function')
      .of.length(1);
  });

  it('it should throw error if input is not a string', () => {
    // Arrange

    const badInput = 2;

    // Assert

    expect(() => VisionService.callVisionApi(badInput)).to.throw(
      'Input is not a valid base64 string'
    );
  });

  it('should return an error object for invalid base64 string', done => {
    // Arrange
    const encodedString = Buffer.from('YoYo').toString('base64');
    const expectedResult = {
      error: {
        code: 3,
        message: 'Invalid image data.'
      }
    };

    // Act
    VisionService.callVisionApi(encodedString)
      .then(actualResult => {
        // Assert
        expect(actualResult).to.deep.equal(expectedResult);
        done();
      })
      .catch(error => done(error));
  });

  it('should return an array of ingredients for a valid base64 image string', done => {
    // Arrange

    fs.readFile(
      'src/services/vision-service/assets/test-image.png',
      'base64',
      (err, data) => {
        if (err) done();
        else {
          VisionService.callVisionApi(data)
            .then(actualResult => {
              expect(actualResult).to.be.an('array');
              done();
            })
            .catch(error => done(error));
        }
      }
    );

    // Act
  });
});
