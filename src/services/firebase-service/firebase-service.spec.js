/* eslint-env mocha */

const FirebaseService = require('./firebase-service');
const { expect } = require('chai');

describe('Firebase Service', () => {
  it('is a function of arity 1', () => {
    expect(FirebaseService.validateIngredients).to.be.a('function');
  });

  it('should return an empty array for an empty ingredient list', () => {
    // Arrange
    const emptyList = [];

    // Act

    const actualResult = FirebaseService.validateIngredients(emptyList);

    // Assert

    expect(actualResult).to.be.null;
  });

  it('should return a categorized array of ingredients for valid ingredients', async () => {
    //Arrange
    const ingredientList = ['sugar', 'palm oil'];
    const expectedResult = [
      {
        category: 'sugar',
        description: 'Sugar is terrible for you',
        foundIngredients: ['sugar']
      },
      {
        category: 'palm oil',
        description: 'Palm oil kills the orangutans',
        foundIngredients: ['palm oil']
      }
    ];

    // Act
    const actualResult = await FirebaseService.validateIngredients(
      ingredientList
    );

    // Assert
    expect(actualResult).to.deep.equal(expectedResult);
  });
});
