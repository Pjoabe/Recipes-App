import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Drinks from './pages/Drinks';
import drinksProgress from './pages/Drinks-progress';
// import drinksRecipes from './pages/Drinks-recipes';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Meals from './pages/Meals';
import mealsProgress from './pages/Meals-progress';
// import mealsRecipes from './pages/Meals-recipes';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
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
        <Route path="/done-recipes" component={ Recipes } />
        <Route path="/favorite-recipes" component={ Favorites } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
