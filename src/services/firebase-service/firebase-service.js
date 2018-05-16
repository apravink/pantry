const firebase = require('firebase');
require('dotenv').config();
const { compareTwoStrings } = require('string-similarity');

// const array1 = ['ball', 'you', 'weights'];
// const array2 = ['sWetts', 'child', 'You.', 'barbell'];

// const array3 = array1.filter(i =>
//   array2.some(j => compareTwoStrings(i, j) > 0.6)
// );
// console.log(array3);

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};
firebase.initializeApp(config);
let activeIngredients;
exports.validateIngredients = ingredientsFromCamera => {
  if (ingredientsFromCamera.length === 0) {
    return null;
  }
  const ingredientsRef = firebase
    .database()
    .ref('/list')
    .orderByKey();

  return ingredientsRef.once('value').then(snapshot => {
    const pantry = [...snapshot.val()];

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
            foundIngredients: pantryItem.ingredients.filter(ingredient =>
              ingredientsFromCamera.some(i => {
                return compareTwoStrings(ingredient, i) > 0.6;
              })
            )
          }
        ];
      }, []);

    firebase.database().goOffline();
    return activeIngredients;
  });
};
