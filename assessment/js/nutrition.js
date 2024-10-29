import { fetchRandomMeal, searchMeals, getRecipeDetails, getIngredients } from './mealdb.js';

function initNutritionPage() {
  fetchRandomMeal().then(displayMeal).catch(handleError);

  const searchForm = document.getElementById('searchForm');
  searchForm.addEventListener('submit', handleSearch);

  const randomMealBtn = document.getElementById('randomMealBtn');
  randomMealBtn.addEventListener('click', () => fetchRandomMeal().then(displayMeal).catch(handleError));

  const modal = document.getElementById('recipeModal');
  const closeBtn = document.getElementsByClassName('close')[0];
  closeBtn.onclick = () => modal.style.display = "none";
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function handleSearch(event) {
  event.preventDefault();
  const query = document.getElementById('searchInput').value;
  searchMeals(query).then(displayMeals).catch(handleError);
}

function displayMeal(meal) {
  const mealContainer = document.getElementById('mealContainer');
  mealContainer.innerHTML = createMealCard(meal);
}

function displayMeals(meals) {
  const mealsContainer = document.getElementById('mealsContainer');
  if (!meals) {
    mealsContainer.innerHTML = '<p>No meals found. Try another search.</p>';
    return;
  }
  mealsContainer.innerHTML = `
    <h2>Search Results</h2>
    <div class="recipe-grid">
      ${meals.map(meal => createMealCard(meal)).join('')}
    </div>
  `;
}

function createMealCard(meal) {
  return `
    <div class="recipe-card">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="recipe-card-content">
        <h3>${meal.strMeal}</h3>
        <p>Category: ${meal.strCategory}</p>
        <button class="btn-action" onclick="showRecipe('${meal.idMeal}')">View Recipe</button>
      </div>
    </div>
  `;
}

function handleError(error) {
  console.error('Error:', error);
  alert('An error occurred. Please try again later.');
}

window.showRecipe = function(mealId) {
  getRecipeDetails(mealId)
    .then(meal => {
      const modal = document.getElementById('recipeModal');
      const modalContent = document.getElementById('recipeModalContent');
      modalContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <h3>Ingredients:</h3>
        <ul>
          ${getIngredients(meal)}
        </ul>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
      `;
      modal.style.display = "block";
    })
    .catch(error => {
      console.error('Error fetching recipe details:', error);
      alert('Error fetching recipe details. Please try again.');
    });
};

document.addEventListener('DOMContentLoaded', initNutritionPage);