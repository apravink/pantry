const { compareTwoStrings } = require('string-similarity');
const axios = require('axios')

let activeIngredients;
exports.validateIngredients = ingredientsFromCamera => {
  if (ingredientsFromCamera.length === 0) {
    return null;
  }

  return axios
  .get('https://durable-retina-113422.firebaseio.com/list.json')
  .then(snapshot => {
    console.log(snapshot.data)
    const pantry = [...snapshot.data];

    activeIngredients = pantry
      .filter(pantryItem =>
        pantryItem.ingredients.some(i =>
          ingredientsFromCamera.some(j => {
            return compareTwoStrings(i, j) > 0.6;
          })
        )
      )
      .reduce((acc, pantryItem) => {
        return [
          ...acc,
          {
            category: pantryItem.category,
            description: pantryItem.description,
            foundIngredients: ingredientsFromCamera.filter(ingredient =>
              pantryItem.ingredients.some(i => {
                return compareTwoStrings(ingredient, i) > 0.6;
              })
            )
          }
        ];
      }, []);
    return activeIngredients;
  });
};
