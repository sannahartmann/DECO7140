// Import necessary functions from meal database module
import { fetchRandomMeal, searchMeals, getRecipeDetails, getIngredients } from './mealdb.js';

// Initializes the page with a random meal and sets up event listeners
function initNutritionPage() {
  fetchRandomMeal().then(displayMeal).catch(handleError); // Load a random meal on page load

  const searchForm = document.getElementById('searchForm');
  searchForm.addEventListener('submit', handleSearch); // Handle meal search on form submission

  const randomMealBtn = document.getElementById('randomMealBtn');
  randomMealBtn.addEventListener('click', () => fetchRandomMeal().then(displayMeal).catch(handleError)); // Load new random meal

  // Modal setup to display and close meal details
  const modal = document.getElementById('recipeModal');
  const closeBtn = document.getElementsByClassName('close')[0];
  closeBtn.onclick = () => modal.style.display = "none"; // Close modal on 'X' click
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none"; // Close modal if clicking outside it
    }
  };
}

// Handles search form submission
function handleSearch(event) {
  event.preventDefault(); // Prevents page reload on form submission
  const query = document.getElementById('searchInput').value;
  searchMeals(query).then(displayMeals).catch(handleError); // Fetch meals matching query
}

// Displays a single meal in the designated container
function displayMeal(meal) {
  const mealContainer = document.getElementById('mealContainer');
  mealContainer.innerHTML = createMealCard(meal);
}

// Displays a list of meals based on search results
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

// Creates an HTML card for a meal
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

// Handles errors by logging and showing an alert
function handleError(error) {
  console.error('Error:', error);
  alert('An error occurred. Please try again later.');
}

// Displays detailed recipe information in a modal
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

// Initializes the page once content is loaded
document.addEventListener('DOMContentLoaded', initNutritionPage);
