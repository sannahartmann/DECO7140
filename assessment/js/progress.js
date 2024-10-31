// Import necessary functions for logging, uploading, and fetching progress data
import { logPageLoadmessage, uploadProgress, fetchProgress } from './components.js';

// Initializes the progress page, sets up the form, and fetches current progress data
function initProgressPage() {
  logPageLoadmessage(); // Log that the page has loaded
  fetchProgress().then(displayProgress).catch(handleGETError); // Fetch and display progress data

  const form = document.getElementById('progressForm');
  form.addEventListener('submit', handleSubmit); // Handle form submission

  // Set date input to today's date by default
  const dateInput = document.getElementById('date');
  dateInput.valueAsDate = new Date();
}

// Handles form submission for uploading progress data
function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  // Add fields required by the API
  formData.append('product_name', 'Progress Entry');
  formData.append('product_owner', 'User');
  formData.append('product_description', `Date: ${formData.get('date')}, Exercise: ${formData.get('exercise')}, Duration: ${formData.get('duration')} minutes, Weight: ${formData.get('weight')} kg`);

  uploadProgress(formData) // Upload progress data
    .then(handleSuccess) // Handle successful upload
    .catch(handleError); // Handle errors during upload
}

// Handles successful progress upload
function handleSuccess(result) {
  console.log('Progress uploaded', result);
  alert('Progress uploaded successfully!');
  fetchProgress().then(displayProgress).catch(handleGETError); // Refresh progress data after upload
  document.getElementById('progressForm').reset(); // Reset form fields

  // Reset the date input to today's date after form submission
  const dateInput = document.getElementById('date');
  dateInput.valueAsDate = new Date();
}

// Handles upload errors
function handleError(error) {
  console.error('Error uploading progress:', error);
  alert('Error uploading progress: ' + error.message);
}

// Handles errors when fetching progress data
function handleGETError(error) {
  console.error('Error fetching progress:', error);
  alert('Error fetching progress data. Please try again later.');
}

// Displays progress data in a table
function displayProgress(data) {
  const tableBody = document.querySelector('#progressTable tbody');
  tableBody.innerHTML = ''; // Clear existing table data
  data.forEach(item => {
    const row = tableBody.insertRow();
    let date = 'N/A';
    let exercise = 'N/A';
    let duration = 'N/A';
    let weight = 'N/A';

    // Parse description to extract date, exercise, duration, and weight details
    if (item.product_description) {
      const parts = item.product_description.split(', ');
      parts.forEach(part => {
        if (part.startsWith('Date:')) {
          date = part.split(': ')[1];
        } else if (part.startsWith('Exercise:')) {
          exercise = part.split(': ')[1];
        } else if (part.startsWith('Duration:')) {
          duration = part.split(': ')[1];
        } else if (part.startsWith('Weight:')) {
          weight = part.split(': ')[1];
        }
      });
    }

    // Insert parsed values into the table row
    row.insertCell(0).textContent = date;
    row.insertCell(1).textContent = weight;
    row.insertCell(2).textContent = exercise;
    row.insertCell(3).textContent = duration;
  });
}

// Initialize the page once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initProgressPage);
