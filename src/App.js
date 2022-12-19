// import drinksRecipes from './pages/Drinks-recipes';
// import mealsRecipes from './pages/Meals-recipes';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import './App.css';
import Drinks from './pages/Drinks';
import drinksProgress from './pages/Drinks-progress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Meals from './pages/Meals';
import mealsProgress from './pages/Meals-progress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <RecipesProvider displayName="Context Display Name">
      <Switch>
        <Route path="/meals/:idDaReceita" component={ RecipeDetails } />
        <Route path="/drinks/:idDaReceita" component={ RecipeDetails } />
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals/:id-da-receita/in-progress" component={ mealsProgress } />
        <Route path="/drinks/:id-da-receita/in-progress" component={ drinksProgress } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
