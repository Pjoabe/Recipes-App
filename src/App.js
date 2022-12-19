import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import './App.css';
import Drinks from './pages/Drinks';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <RecipesProvider displayName="Context Display Name">
      <Switch>
        <Route exact path="/meals/:idDaReceita" component={ RecipeDetails } />
        <Route exact path="/drinks/:idDaReceita" component={ RecipeDetails } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ Recipes } />
        <Route exact path="/favorite-recipes" component={ Favorites } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
