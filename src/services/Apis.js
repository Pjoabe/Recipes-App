// Ingredientes
export const ingredientName = async (fIngredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${fIngredient}`);
  const data = await response.json();
  return data.meals;
};
// Nome da comida
export const FoodName = async (foodName) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`);
  const data = await response.json();
  return data.meals;
};
// Primeira letra
export const firstLetter = async (foodFLetter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${foodFLetter}`);
  const data = await response.json();
  return data.meals;
};
// COMIDAS ACIMA ^^^^^^^
// Drinks && Bebidas
export const ingredientDrink = async (drinkIngredient) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkIngredient}`);
  const data = await response.json();
  return data.drinks;
};
// Nome da bebida
export const drinkName = async (drinName) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinName}`);
  const data = await response.json();
  return data.drinks;
};
// Primeira letra do ingrediente || bebida
export const firstLetterDrink = async (drinkFLetter) => {
  if (drinkFLetter.length === 1) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${drinkFLetter}`);
    const data = await response.json();
    return data.drinks;
  }
};
// doze primeiras comidas
export const firstTwelveFoods = async () => {
  const reponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await reponse.json();
  return data.meals;
};
// doze primeiras bebidas
export const firstTwelveDrinks = async () => {
  const reponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await reponse.json();
  return data.drinks;
};
// todas as categorias de comidas
export const allFoodCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.meals;
};
// todas as categorias de bebidas
export const allDrinkCategories = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.drinks;
};
// categorias de bebidas filtradas por nome
export const firstTwelveDrinkCategories = async (category) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.drinks;
};
// categorias de comidas filtradas por nome
export const firstTwelveFoodCategories = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.meals;
};
// detalhes das comidas recebendo o id como parametro
export const foodDetails = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals;
};
// detalhes das bebidas recebendo o id como parametro
export const drinkDetails = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.drinks;
};
