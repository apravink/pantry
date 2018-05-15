const firebase = require('firebase');
require('dotenv').config();

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
      .filter(pantryItem => {
        return pantryItem.ingredients.some(i =>
          ingredientsFromCamera.includes(i)
        );
      })
      .reduce((acc, pantryItem) => {
        return [
          ...acc,
          {
            category: pantryItem.category,
            description: pantryItem.description,
            foundIngredients: pantryItem.ingredients.filter(ingredient =>
              ingredientsFromCamera.includes(ingredient)
            )
          }
        ];
      }, []);

    firebase.database().goOffline();
    return activeIngredients;
  });
};
