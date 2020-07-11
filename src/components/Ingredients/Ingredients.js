import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientsList from './IngredientList';

const url = 'your firebase url';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(url + '/ingredients.json').then(response => {
      return response.json();
    }).then(responseData => {
      const loadedIngredients = [];
      for (const key in responseData) {
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        });
      }
      setIngredients(loadedIngredients);
    }).catch(err => console.log(err));
  }, [])

  const addIngredientHandler = (ingredient) => {
    fetch(url + '/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();

    }).then(responseData => {
      setIngredients(prevIngredient => [...prevIngredient,
      {
        id: responseData.name,
        ...ingredient
      }
      ]);
    }).catch(err => console.log(err));

    setIngredients(prevIngredient => [...prevIngredient,
    {
      id: Math.random().toString(),
      ...ingredient
    }
    ]);
  };

  const removeIngredientHandler = (ingredientId) => {
    setIngredients(prevIngredient => prevIngredient.filter(ingredient => ingredient.id
      !== ingredientId))
  };


  return (
    <div className="App" >
      <IngredientForm
        onAddIngredient={addIngredientHandler}
      />

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientsList ingredients={ingredients}
          onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
