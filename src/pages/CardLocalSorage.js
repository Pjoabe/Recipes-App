import '../styles/profile.css';

const getLocalStorage = localStorage.getItem('favoriteRecipes');
const resultado = JSON.parse(getLocalStorage);
console.log(resultado);
console.log(resultado[0].id);

const doneRecipes = {
  id: '01',
  type: 'meal - ou - drink',
  nationality: 'nacionalidade - da - receita - ou - texto - vazio',
  category: 'categoria - da - receita - ou - texto - vazio',
  alcoholicOrNot: 'u - texto - vazio',
  name: 'nome - da - receita',
  image: 'imagem - da - receita',
  doneDate: 'quando - a - receita - foi - concluida',
  tags: 'array - de - tags - da - receita - ou - array - vazio',
};
localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
export default CardLocalSorage;
