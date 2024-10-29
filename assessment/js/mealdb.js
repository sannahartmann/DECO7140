const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

function fetchRandomMeal(displayMeal, handleError) {
  fetch(`${API_BASE_URL}/random.php`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayMeal(data.meals[0]);
    })
    .catch(error => {
      console.error('Error fetching random meal:', error);
      handleError(error);
    });
}

function searchMeals(query, displayMeals, handleError) {
  fetch(`${API_BASE_URL}/search.php?s=${encodeURIComponent(query)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayMeals(data.meals);
    })
    .catch(error => {
      console.error('Error searching meals:', error);
      handleError(error);
    });
}

export { fetchRandomMeal, searchMeals };