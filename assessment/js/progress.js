import { logPageLoadmessage, uploadProgress, fetchProgress } from './components.js';

function initProgressPage() {
  logPageLoadmessage();
  fetchProgress().then(displayProgress).catch(handleGETError);

  const form = document.getElementById('progressForm');
  form.addEventListener('submit', handleSubmit);

  // Set the default date to today
  const dateInput = document.getElementById('date');
  dateInput.valueAsDate = new Date();
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  // Add required fields for the API
  formData.append('product_name', 'Progress Entry');
  formData.append('product_owner', 'User');
  formData.append('product_description', `Date: ${formData.get('date')}, Exercise: ${formData.get('exercise')}, Duration: ${formData.get('duration')} minutes, Weight: ${formData.get('weight')} kg`);
  
  uploadProgress(formData)
    .then(handleSuccess)
    .catch(handleError);
}

function handleSuccess(result) {
  console.log('Progress uploaded', result);
  alert('Progress uploaded successfully!');
  fetchProgress().then(displayProgress).catch(handleGETError);
  document.getElementById('progressForm').reset();
  // Reset the date input to today's date after form submission
  const dateInput = document.getElementById('date');
  dateInput.valueAsDate = new Date();
}

function handleError(error) {
  console.error('Error uploading progress:', error);
  alert('Error uploading progress: ' + error.message);
}

function handleGETError(error) {
  console.error('Error fetching progress:', error);
  alert('Error fetching progress data. Please try again later.');
}

function displayProgress(data) {
  const tableBody = document.querySelector('#progressTable tbody');
  tableBody.innerHTML = '';
  data.forEach(item => {
    const row = tableBody.insertRow();
    let date = 'N/A';
    let exercise = 'N/A';
    let duration = 'N/A';
    let weight = 'N/A';

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

    row.insertCell(0).textContent = date;
    row.insertCell(1).textContent = weight;
    row.insertCell(2).textContent = exercise;
    row.insertCell(3).textContent = duration;
  });
}

document.addEventListener('DOMContentLoaded', initProgressPage);