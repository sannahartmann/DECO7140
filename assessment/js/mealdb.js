const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export function fetchRandomMeal() {
  return fetch(`${API_BASE_URL}/random.php`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data.meals[0])
    .catch(error => {
      console.error('Error fetching random meal:', error);
      throw error;
    });
}

export function searchMeals(query) {
  return fetch(`${API_BASE_URL}/search.php?s=${encodeURIComponent(query)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data.meals)
    .catch(error => {
      console.error('Error searching meals:', error);
      throw error;
    });
}

export function getRecipeDetails(mealId) {
  return fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data.meals[0])
    .catch(error => {
      console.error('Error fetching recipe details:', error);
      throw error;
    });
}

export function getIngredients(meal) {
  let ingredients = '';
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
    }
  }
  return ingredients;
}